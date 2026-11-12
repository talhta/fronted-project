import { Link, useParams } from 'react-router'
import { getSpriteUrl } from '../api/pokemon'

// Temporary: shows only the id and image. Task 5 fetches the full details.
function DetailsPage() {
  const { id } = useParams()
  const pokemonId = Number(id)

  if (!Number.isInteger(pokemonId) || pokemonId <= 0) {
    return (
      <>
        <h1>Pokémon not found</h1>
        <p>
          "{id}" is not a valid Pokémon id. <Link to="/">Back to the list</Link>
        </p>
      </>
    )
  }

  return (
    <>
      <h1>#{pokemonId}</h1>
      <img
        src={getSpriteUrl(pokemonId)}
        alt={`Pokémon #${pokemonId}`}
        width="192"
        height="192"
      />
    </>
  )
}

export default DetailsPage
