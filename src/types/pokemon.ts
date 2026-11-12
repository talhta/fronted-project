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
