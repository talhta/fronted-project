import type {
  Pokemon,
  PokemonDetails,
  PokemonDetailsResponse,
  PokemonListResponse,
} from '../types/pokemon'

const API_BASE = 'https://pokeapi.co/api/v2'
const SPRITE_BASE =
  'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon'

// "https://pokeapi.co/api/v2/pokemon/25/" -> 25
export function getIdFromUrl(url: string): number {
  const match = url.match(/\/(\d+)\/?$/)
  if (!match) {
    throw new Error(`No Pokémon id found in url: ${url}`)
  }
  return Number(match[1])
}

export function getSpriteUrl(id: number): string {
  return `${SPRITE_BASE}/${id}.png`
}

export async function fetchPokemonList(
  limit = 60,
  signal?: AbortSignal,
): Promise<Pokemon[]> {
  const response = await fetch(`${API_BASE}/pokemon?limit=${limit}`, { signal })
  if (!response.ok) {
    throw new Error(`Failed to load Pokémon (status ${response.status})`)
  }
  const data: PokemonListResponse = await response.json()
  return data.results.map((item) => {
    const id = getIdFromUrl(item.url)
    return { id, name: item.name, image: getSpriteUrl(id) }
  })
}

// Turns the raw API response into the shape the UI uses.
// Prefers the official artwork, then the small sprite, then a sprite URL built from the id.
export function toPokemonDetails(raw: PokemonDetailsResponse): PokemonDetails {
  const image =
    raw.sprites.other?.['official-artwork']?.front_default ??
    raw.sprites.front_default ??
    getSpriteUrl(raw.id)

  return {
    id: raw.id,
    name: raw.name,
    image,
    types: [...raw.types]
      .sort((a, b) => a.slot - b.slot)
      .map((t) => t.type.name),
    abilities: raw.abilities.map((a) => ({
      name: a.ability.name,
      hidden: a.is_hidden,
    })),
    stats: raw.stats.map((s) => ({ name: s.stat.name, value: s.base_stat })),
  }
}

export async function fetchPokemonDetails(
  id: number,
  signal?: AbortSignal,
): Promise<PokemonDetails> {
  const response = await fetch(`${API_BASE}/pokemon/${id}`, { signal })
  if (response.status === 404) {
    throw new Error(`Pokémon #${id} not found`)
  }
  if (!response.ok) {
    throw new Error(`Failed to load Pokémon (status ${response.status})`)
  }
  const data: PokemonDetailsResponse = await response.json()
  return toPokemonDetails(data)
}
