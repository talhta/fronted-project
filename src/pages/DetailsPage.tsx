import { Link, useParams } from 'react-router'
import pokemonData from '../data/pokemon.json'
import type { Pokemon } from '../types/pokemon'

const pokemonList: Pokemon[] = pokemonData

function DetailsPage() {
  const { id } = useParams()
  const pokemon = pokemonList.find((p) => p.id === Number(id))

  if (!pokemon) {
    return (
      <>
        <h1>Pokémon not found</h1>
        <p>
          There is no Pokémon with id {id}. <Link to="/">Back to the list</Link>
        </p>
      </>
    )
  }

  return (
    <>
      <h1 className="pokemon-name">{pokemon.name}</h1>
      <img src={pokemon.image} alt={pokemon.name} width="192" height="192" />
      <p>#{pokemon.id}</p>
    </>
  )
}

export default DetailsPage
