import { Link } from 'react-router'
import FavoriteButton from './FavoriteButton'
import type { Pokemon } from '../types/pokemon'

type Props = {
  pokemon: Pokemon
  isFavorite: boolean
  onToggleFavorite: (id: number) => void
}

function PokemonCard({ pokemon, isFavorite, onToggleFavorite }: Props) {
  return (
    <li className="pokemon-card-item">
      <Link to={`/items/${pokemon.id}`} className="pokemon-card">
        <img src={pokemon.image} alt={pokemon.name} width="96" height="96" />
        <span className="pokemon-name">{pokemon.name}</span>
      </Link>
      {/* Next to the link, not inside it: a button inside a link is invalid HTML. */}
      <FavoriteButton
        name={pokemon.name}
        isFavorite={isFavorite}
        onToggle={() => onToggleFavorite(pokemon.id)}
      />
    </li>
  )
}

export default PokemonCard
