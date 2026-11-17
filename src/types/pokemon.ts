export type Pokemon = {
  id: number
  name: string
  image: string
}

// Raw response from https://pokeapi.co/api/v2/pokemon?limit=...
export type PokemonListResponse = {
  results: {
    name: string
    url: string
  }[]
}

// Raw response from https://pokeapi.co/api/v2/pokemon/{id} (only the fields we use)
export type PokemonDetailsResponse = {
  id: number
  name: string
  types: { slot: number; type: { name: string } }[]
  abilities: { is_hidden: boolean; ability: { name: string } }[]
  stats: { base_stat: number; stat: { name: string } }[]
  sprites: {
    front_default: string | null
    other?: {
      'official-artwork'?: {
        front_default: string | null
      }
    }
  }
}

// Clean shape the details page uses
export type PokemonDetails = {
  id: number
  name: string
  image: string
  types: string[]
  abilities: { name: string; hidden: boolean }[]
  stats: { name: string; value: number }[]
}
