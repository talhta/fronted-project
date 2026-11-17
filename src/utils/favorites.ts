// Pure helpers for favorites. No React here, so they're easy to test.

export const FAVORITES_KEY = 'pokedex:favorites'

// The two localStorage methods we use. Tests pass in a fake object with these.
export type FavoritesStorage = Pick<Storage, 'getItem' | 'setItem'>

export function isFavorite(ids: number[], id: number): boolean {
  return ids.includes(id)
}

// Adds the id if it's missing, removes it if it's there. Always returns a new array.
export function toggleFavorite(ids: number[], id: number): number[] {
  return isFavorite(ids, id) ? ids.filter((x) => x !== id) : [...ids, id]
}

// Reads the saved ids. Returns [] if nothing is saved or the data is broken.
export function loadFavorites(storage?: FavoritesStorage): number[] {
  try {
    const raw = (storage ?? window.localStorage).getItem(FAVORITES_KEY)
    if (raw === null) return []
    const parsed: unknown = JSON.parse(raw)
    if (!Array.isArray(parsed)) return []
    const ids = parsed.filter(
      (x): x is number => Number.isInteger(x) && x > 0,
    )
    return [...new Set(ids)]
  } catch {
    // Broken JSON, or localStorage is blocked: start with no favorites.
    return []
  }
}

// Saves the ids. Does nothing (instead of crashing) if localStorage is blocked or full.
export function saveFavorites(ids: number[], storage?: FavoritesStorage): void {
  try {
    ;(storage ?? window.localStorage).setItem(FAVORITES_KEY, JSON.stringify(ids))
  } catch {
    // Ignore: favorites just won't be remembered after a refresh.
  }
}
