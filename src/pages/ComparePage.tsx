import { useEffect, useState } from 'react'
import StatsColumn from '../components/StatsColumn'
import { fetchPokemonList } from '../api/pokemon'
import type { Pokemon } from '../types/pokemon'

function ComparePage() {
  // The list fills the two dropdowns.
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // The picked Pokémon on each side (null = nothing picked yet).
  const [firstId, setFirstId] = useState<number | null>(null)
  const [secondId, setSecondId] = useState<number | null>(null)

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

  // One dropdown. "" in the <select> means nothing is picked.
  function renderPicker(
    id: string,
    label: string,
    value: number | null,
    onChange: (id: number | null) => void,
  ) {
    return (
      <div className="compare-picker">
        <label htmlFor={id}>{label}</label>
        <select
          id={id}
          value={value ?? ''}
          onChange={(e) => onChange(e.target.value === '' ? null : Number(e.target.value))}
        >
          <option value="">Pick a Pokémon</option>
          {pokemonList.map((pokemon) => (
            <option key={pokemon.id} value={pokemon.id}>
              {pokemon.name}
            </option>
          ))}
        </select>
      </div>
    )
  }

  function renderColumn(id: number | null) {
    if (id === null) {
      return <section className="stats-column empty">Pick a Pokémon above</section>
    }
    return <StatsColumn key={id} pokemonId={id} />
  }

  return (
    <>
      <h1>Compare</h1>
      {loading && <p>Loading…</p>}
      {error && <p className="error">Couldn't load Pokémon: {error}</p>}
      {!loading && !error && (
        <>
          <div className="compare-grid">
            {renderPicker('first-pokemon', 'First Pokémon', firstId, setFirstId)}
            {renderPicker('second-pokemon', 'Second Pokémon', secondId, setSecondId)}
          </div>
          <div className="compare-grid">
            {renderColumn(firstId)}
            {renderColumn(secondId)}
          </div>
        </>
      )}
    </>
  )
}

export default ComparePage
