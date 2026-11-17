import type { Pokemon } from '../types/pokemon'

// Returns the Pokémon whose name contains the query (ignores case and outer spaces).
// An empty query returns the whole list. Never changes the original array.
export function filterPokemonByName(list: Pokemon[], query: string): Pokemon[] {
  const search = query.trim().toLowerCase()
  if (search === '') {
    return [...list]
  }
  return list.filter((pokemon) => pokemon.name.toLowerCase().includes(search))
}
