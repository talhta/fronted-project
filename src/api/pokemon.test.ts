import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  fetchPokemonDetails,
  fetchPokemonList,
  getIdFromUrl,
  getSpriteUrl,
  toPokemonDetails,
} from './pokemon'
import type { PokemonDetailsResponse } from '../types/pokemon'

const SPRITE_BASE =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

describe('getIdFromUrl', () => {
  it('gets the id from a url with a trailing slash', () => {
    expect(getIdFromUrl('https://pokeapi.co/api/v2/pokemon/25/')).toBe(25)
  })

  it('gets the id from a url without a trailing slash', () => {
    expect(getIdFromUrl('https://pokeapi.co/api/v2/pokemon/25')).toBe(25)
  })

  it('handles multi-digit ids', () => {
    expect(getIdFromUrl('https://pokeapi.co/api/v2/pokemon/1025/')).toBe(1025)
  })

  it('throws when the url has no id at the end', () => {
    expect(() => getIdFromUrl('https://pokeapi.co/api/v2/pokemon/')).toThrow(
      'No Pokémon id found',
    )
  })
})

describe('getSpriteUrl', () => {
  it('builds the sprite image url from an id', () => {
    expect(getSpriteUrl(25)).toBe(`${SPRITE_BASE}/25.png`)
  })
})

describe('fetchPokemonList', () => {
  // Replace the real fetch with a fake one that returns the given response.
  function mockFetch(body: unknown, init: { ok?: boolean; status?: number } = {}) {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: init.ok ?? true,
      status: init.status ?? 200,
      json: () => Promise.resolve(body),
    })
    vi.stubGlobal('fetch', fetchMock)
    return fetchMock
  }

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('turns the API results into Pokémon with id, name and image', async () => {
    mockFetch({
      results: [
        { name: 'bulbasaur', url: 'https://pokeapi.co/api/v2/pokemon/1/' },
        { name: 'pikachu', url: 'https://pokeapi.co/api/v2/pokemon/25/' },
      ],
    })

    const list = await fetchPokemonList()

    expect(list).toEqual([
      { id: 1, name: 'bulbasaur', image: `${SPRITE_BASE}/1.png` },
      { id: 25, name: 'pikachu', image: `${SPRITE_BASE}/25.png` },
    ])
  })

  it('asks for 60 Pokémon by default, or the given limit', async () => {
    const fetchMock = mockFetch({ results: [] })

    await fetchPokemonList()
    await fetchPokemonList(10)

    expect(fetchMock.mock.calls[0][0]).toBe(
      'https://pokeapi.co/api/v2/pokemon?limit=60',
    )
    expect(fetchMock.mock.calls[1][0]).toBe(
      'https://pokeapi.co/api/v2/pokemon?limit=10',
    )
  })

  it('throws an error when the response is not OK', async () => {
    mockFetch({}, { ok: false, status: 500 })

    await expect(fetchPokemonList()).rejects.toThrow(
      'Failed to load Pokémon (status 500)',
    )
  })
})

// A small, realistic details response (shape taken from /pokemon/25).
function makeDetailsResponse(
  overrides: Partial<PokemonDetailsResponse> = {},
): PokemonDetailsResponse {
  return {
    id: 25,
    name: 'pikachu',
    types: [{ slot: 1, type: { name: 'electric' } }],
    abilities: [
      { is_hidden: false, ability: { name: 'static' } },
      { is_hidden: true, ability: { name: 'lightning-rod' } },
    ],
    stats: [
      { base_stat: 35, stat: { name: 'hp' } },
      { base_stat: 55, stat: { name: 'attack' } },
    ],
    sprites: {
      front_default: `${SPRITE_BASE}/25.png`,
      other: {
        'official-artwork': {
          front_default: `${SPRITE_BASE}/other/official-artwork/25.png`,
        },
      },
    },
    ...overrides,
  }
}

describe('toPokemonDetails', () => {
  it('turns the raw response into types, abilities, stats and artwork', () => {
    expect(toPokemonDetails(makeDetailsResponse())).toEqual({
      id: 25,
      name: 'pikachu',
      image: `${SPRITE_BASE}/other/official-artwork/25.png`,
      types: ['electric'],
      abilities: [
        { name: 'static', hidden: false },
        { name: 'lightning-rod', hidden: true },
      ],
      stats: [
        { name: 'hp', value: 35 },
        { name: 'attack', value: 55 },
      ],
    })
  })

  it('falls back to the regular sprite when there is no official artwork', () => {
    const raw = makeDetailsResponse({
      sprites: {
        front_default: `${SPRITE_BASE}/25.png`,
        other: { 'official-artwork': { front_default: null } },
      },
    })

    expect(toPokemonDetails(raw).image).toBe(`${SPRITE_BASE}/25.png`)
  })

  it('lists types in slot order', () => {
    const raw = makeDetailsResponse({
      types: [
        { slot: 2, type: { name: 'poison' } },
        { slot: 1, type: { name: 'grass' } },
      ],
    })

    expect(toPokemonDetails(raw).types).toEqual(['grass', 'poison'])
  })
})

describe('fetchPokemonDetails', () => {
  function mockFetch(body: unknown, init: { ok?: boolean; status?: number } = {}) {
    const fetchMock = vi.fn().mockResolvedValue({
      ok: init.ok ?? true,
      status: init.status ?? 200,
      json: () => Promise.resolve(body),
    })
    vi.stubGlobal('fetch', fetchMock)
    return fetchMock
  }

  afterEach(() => {
    vi.unstubAllGlobals()
  })

  it('requests /pokemon/{id} and returns the cleaned-up details', async () => {
    const fetchMock = mockFetch(makeDetailsResponse())

    const pokemon = await fetchPokemonDetails(25)

    expect(fetchMock.mock.calls[0][0]).toBe('https://pokeapi.co/api/v2/pokemon/25')
    expect(pokemon.name).toBe('pikachu')
    expect(pokemon.types).toEqual(['electric'])
  })

  it('throws a "not found" error for an unknown id (404)', async () => {
    mockFetch({}, { ok: false, status: 404 })

    await expect(fetchPokemonDetails(99999)).rejects.toThrow(
      'Pokémon #99999 not found',
    )
  })

  it('throws a general error for other failed responses', async () => {
    mockFetch({}, { ok: false, status: 500 })

    await expect(fetchPokemonDetails(25)).rejects.toThrow(
      'Failed to load Pokémon (status 500)',
    )
  })
})
