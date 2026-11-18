import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router'
import { fetchPokemonDetails } from '../api/pokemon'
import FavoriteButton from '../components/FavoriteButton'
import StatList from '../components/StatList'
import { formatId } from '../utils/formatId'
import { isFavorite } from '../utils/favorites'
import type { PokemonDetails } from '../types/pokemon'

// What we got back for a given id: either the data or an error message.
type Result =
  | { id: number; pokemon: PokemonDetails; error: null }
  | { id: number; pokemon: null; error: string }

type Props = {
  favorites: number[]
  onToggleFavorite: (id: number) => void
}

function DetailsPage({ favorites, onToggleFavorite }: Props) {
  const { id } = useParams()
  const pokemonId = Number(id)
  const isValidId = Number.isInteger(pokemonId) && pokemonId > 0

  const [result, setResult] = useState<Result | null>(null)

  useEffect(() => {
    if (!isValidId) return
    const controller = new AbortController()

    fetchPokemonDetails(pokemonId, controller.signal)
      .then((pokemon) => setResult({ id: pokemonId, pokemon, error: null }))
      .catch((err: unknown) => {
        if (controller.signal.aborted) return
        const message = err instanceof Error ? err.message : 'Something went wrong'
        setResult({ id: pokemonId, pokemon: null, error: message })
      })

    return () => controller.abort()
  }, [pokemonId, isValidId])

  if (!isValidId) {
    return (
      <div className="message">
        <h1>Pokémon not found</h1>
        <p>
          "{id}" is not a valid Pokémon id. <Link to="/">Back to the list</Link>
        </p>
      </div>
    )
  }

  // Still loading if we have no result yet, or the result is for a previous id.
  if (!result || result.id !== pokemonId) {
    return <p className="message">Loading…</p>
  }

  if (result.error !== null) {
    return (
      <div className="message">
        <h1>Couldn't load this Pokémon</h1>
        <p className="error">{result.error}</p>
        <p>
          <Link to="/">Back to the list</Link>
        </p>
      </div>
    )
  }

  const { pokemon } = result

  return (
    <article className="details">
      <div className="details-header">
        <h1 className="pokemon-name">{pokemon.name}</h1>
        <span className="pokemon-id">{formatId(pokemon.id)}</span>
        <FavoriteButton
          name={pokemon.name}
          isFavorite={isFavorite(favorites, pokemon.id)}
          onToggle={() => onToggleFavorite(pokemon.id)}
        />
      </div>

      <img
        className="details-image"
        src={pokemon.image}
        alt={pokemon.name}
        width="240"
        height="240"
      />

      <h2>Types</h2>
      <ul className="tag-list">
        {pokemon.types.map((type) => (
          <li key={type} className={`tag type-tag type-${type}`}>
            {type}
          </li>
        ))}
      </ul>

      <h2>Abilities</h2>
      <ul className="tag-list">
        {pokemon.abilities.map((ability) => (
          <li key={ability.name} className="tag">
            {ability.name}
            {ability.hidden && <span className="tag-note"> (hidden)</span>}
          </li>
        ))}
      </ul>

      <h2>Stats</h2>
      <StatList stats={pokemon.stats} />
    </article>
  )
}

export default DetailsPage
