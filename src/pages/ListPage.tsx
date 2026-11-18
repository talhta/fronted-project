import { useEffect, useState } from 'react'
import PokemonCard from '../components/PokemonCard'
import { fetchPokemonList } from '../api/pokemon'
import { filterPokemonByName } from '../utils/filterPokemon'
import { isFavorite } from '../utils/favorites'
import type { Pokemon } from '../types/pokemon'

type Props = {
  favorites: number[]
  onToggleFavorite: (id: number) => void
}

function ListPage({ favorites, onToggleFavorite }: Props) {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [query, setQuery] = useState('')

  useEffect(() => {
    const controller = new AbortController()

    fetchPokemonList(60, controller.signal)
      .then((list) => {
        setPokemonList(list)
        setLoading(false)
      })
      .catch((err: unknown) => {
        if (controller.signal.aborted) return
        setError(err instanceof Error ? err.message : 'Something went wrong')
        setLoading(false)
      })

    return () => controller.abort()
  }, [])

  // Derived from data we already have, so no extra state or effect is needed.
  const visible = filterPokemonByName(pokemonList, query)

  return (
    <>
      <h1>All Pokémon</h1>
      {loading && <p className="message">Loading…</p>}
      {error && <p className="message error">Couldn't load Pokémon: {error}</p>}
      {!loading && !error && (
        <>
          <div className="search">
            <label htmlFor="search">Search by name</label>
            <input
              id="search"
              type="search"
              placeholder="e.g. pikachu"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
            />
          </div>
          {visible.length === 0 ? (
            <p className="message">No Pokémon match "{query.trim()}".</p>
          ) : (
            <ul className="pokemon-list">
              {visible.map((pokemon) => (
                <PokemonCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  isFavorite={isFavorite(favorites, pokemon.id)}
                  onToggleFavorite={onToggleFavorite}
                />
              ))}
            </ul>
          )}
        </>
      )}
    </>
  )
}

export default ListPage
