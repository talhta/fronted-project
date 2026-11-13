import { afterEach, describe, expect, it, vi } from 'vitest'
import { fetchPokemonList, getIdFromUrl, getSpriteUrl } from './pokemon'

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
