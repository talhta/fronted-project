import { useEffect, useState } from 'react'
import PokemonCard from '../components/PokemonCard'
import { fetchPokemonList } from '../api/pokemon'
import type { Pokemon } from '../types/pokemon'

function ListPage() {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  return (
    <>
      <h1>Pokédex</h1>
      {loading && <p>Loading…</p>}
      {error && <p className="error">Couldn't load Pokémon: {error}</p>}
      {!loading && !error && (
        <ul className="pokemon-list">
          {pokemonList.map((pokemon) => (
            <PokemonCard key={pokemon.id} pokemon={pokemon} />
          ))}
        </ul>
      )}
    </>
  )
}

export default ListPage
