import PokemonCard from './components/PokemonCard'
import pokemonData from './data/pokemon.json'
import type { Pokemon } from './types/pokemon'
import './App.css'

const pokemonList: Pokemon[] = pokemonData

function App() {
  return (
    <main>
      <h1>Pokédex</h1>
      <ul className="pokemon-list">
        {pokemonList.map((pokemon) => (
          <PokemonCard key={pokemon.id} pokemon={pokemon} />
        ))}
      </ul>
    </main>
  )
}

export default App
