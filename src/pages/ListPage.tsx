import PokemonCard from '../components/PokemonCard'
import pokemonData from '../data/pokemon.json'
import type { Pokemon } from '../types/pokemon'

const pokemonList: Pokemon[] = pokemonData

function ListPage() {
  return (
    <>
      <h1>Pokédex</h1>
      <ul className="pokemon-list">
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </ul>
    </>
  )
}

export default ListPage
