import { useEffect, useState } from 'react'
import { fetchPokemonDetails } from '../api/pokemon'
import StatList from './StatList'
import type { PokemonDetails } from '../types/pokemon'

type Props = {
  pokemonId: number
}

type Result =
  | { pokemon: PokemonDetails; error: null }
  | { pokemon: null; error: string }

// One column on the compare page: fetches one Pokémon and shows its stats.
// The parent gives it a `key` with the id, so picking another Pokémon starts a fresh column.
function StatsColumn({ pokemonId }: Props) {
  const [result, setResult] = useState<Result | null>(null)

  useEffect(() => {
    const controller = new AbortController()

    fetchPokemonDetails(pokemonId, controller.signal)
      .then((pokemon) => setResult({ pokemon, error: null }))
      .catch((err: unknown) => {
        if (controller.signal.aborted) return
        const message = err instanceof Error ? err.message : 'Something went wrong'
        setResult({ pokemon: null, error: message })
      })

    return () => controller.abort()
  }, [pokemonId])

  if (result === null) {
    return <section className="stats-column message">Loading…</section>
  }

  if (result.error !== null) {
    return (
      <section className="stats-column">
        <p className="error">{result.error}</p>
      </section>
    )
  }

  const { pokemon } = result

  return (
    <section className="stats-column">
      <img src={pokemon.image} alt={pokemon.name} width="120" height="120" />
      <h2 className="pokemon-name">{pokemon.name}</h2>
      <StatList stats={pokemon.stats} />
    </section>
  )
}

export default StatsColumn
