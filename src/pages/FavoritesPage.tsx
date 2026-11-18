import { useEffect, useState } from 'react'
import { Link } from 'react-router'
import PokemonCard from '../components/PokemonCard'
import { fetchPokemonDetails } from '../api/pokemon'
import { isFavorite } from '../utils/favorites'
import type { Pokemon } from '../types/pokemon'

type Props = {
  favorites: number[]
  onToggleFavorite: (id: number) => void
}

function FavoritesPage({ favorites, onToggleFavorite }: Props) {
  // Remember the ids we had when the page opened, and fetch those once.
  // Unstarring here only removes cards (see `visible` below), so no refetch is needed.
  const [idsToLoad] = useState(favorites)
  const [loaded, setLoaded] = useState<Pokemon[] | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (idsToLoad.length === 0) return
    const controller = new AbortController()

    Promise.all(idsToLoad.map((id) => fetchPokemonDetails(id, controller.signal)))
      .then((list) =>
        setLoaded(list.map((p) => ({ id: p.id, name: p.name, image: p.image }))),
      )
      .catch((err: unknown) => {
        if (controller.signal.aborted) return
        setError(err instanceof Error ? err.message : 'Something went wrong')
      })

    return () => controller.abort()
  }, [idsToLoad])

  if (favorites.length === 0) {
    return (
      <>
        <h1>Favorites</h1>
        <p className="message">
          No favorites yet. Tap the ☆ on a Pokémon in the{' '}
          <Link to="/">list</Link> to add one.
        </p>
      </>
    )
  }

  if (error) {
    return (
      <>
        <h1>Favorites</h1>
        <p className="message error">Couldn't load your favorites: {error}</p>
      </>
    )
  }

  if (loaded === null) {
    return (
      <>
        <h1>Favorites</h1>
        <p className="message">Loading…</p>
      </>
    )
  }

  // Hide cards you unstarred on this page, right away.
  const visible = loaded.filter((p) => isFavorite(favorites, p.id))

  return (
    <>
      <h1>Favorites</h1>
      <ul className="pokemon-list">
        {visible.map((pokemon) => (
          <PokemonCard
            key={pokemon.id}
            pokemon={pokemon}
            isFavorite
            onToggleFavorite={onToggleFavorite}
          />
        ))}
      </ul>
    </>
  )
}

export default FavoritesPage
