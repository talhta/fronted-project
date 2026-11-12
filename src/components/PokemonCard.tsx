import type { Pokemon } from '../types/pokemon'

type Props = {
  pokemon: Pokemon
}

function PokemonCard({ pokemon }: Props) {
  return (
    <li className="pokemon-card">
      <img src={pokemon.image} alt={pokemon.name} width="96" height="96" />
      <span className="pokemon-name">{pokemon.name}</span>
    </li>
  )
}

export default PokemonCard
