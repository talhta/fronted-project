type Props = {
  name: string
  isFavorite: boolean
  onToggle: () => void
}

function FavoriteButton({ name, isFavorite, onToggle }: Props) {
  const label = isFavorite
    ? `Remove ${name} from favorites`
    : `Add ${name} to favorites`

  return (
    <button
      type="button"
      className={isFavorite ? 'favorite-button is-favorite' : 'favorite-button'}
      aria-label={label}
      aria-pressed={isFavorite}
      title={label}
      onClick={onToggle}
    >
      {isFavorite ? '★' : '☆'}
    </button>
  )
}

export default FavoriteButton
