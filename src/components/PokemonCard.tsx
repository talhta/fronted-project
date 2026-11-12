import { Link } from 'react-router'
import type { Pokemon } from '../types/pokemon'

type Props = {
  pokemon: Pokemon
}

function PokemonCard({ pokemon }: Props) {
  return (
    <li>
      <Link to={`/items/${pokemon.id}`} className="pokemon-card">
        <img src={pokemon.image} alt={pokemon.name} width="96" height="96" />
        <span className="pokemon-name">{pokemon.name}</span>
      </Link>
    </li>
  )
}

export default PokemonCard
