import type { Pokemon, PokemonListResponse } from '../types/pokemon'

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
