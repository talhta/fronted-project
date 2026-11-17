import { describe, expect, it } from 'vitest'
import {
  FAVORITES_KEY,
  isFavorite,
  loadFavorites,
  saveFavorites,
  toggleFavorite,
  type FavoritesStorage,
} from './favorites'

// A fake localStorage that keeps values in a plain object.
function makeStorage(initial: Record<string, string> = {}) {
  const data: Record<string, string> = { ...initial }
  const storage: FavoritesStorage = {
    getItem: (key) => (key in data ? data[key] : null),
    setItem: (key, value) => {
      data[key] = value
    },
  }
  return { storage, data }
}

describe('isFavorite', () => {
  it('tells whether an id is in the favorites', () => {
    expect(isFavorite([1, 25], 25)).toBe(true)
    expect(isFavorite([1, 25], 4)).toBe(false)
  })
})

describe('toggleFavorite', () => {
  it('adds an id that is not a favorite yet', () => {
    expect(toggleFavorite([1], 25)).toEqual([1, 25])
  })

  it('removes an id that is already a favorite', () => {
    expect(toggleFavorite([1, 25, 4], 25)).toEqual([1, 4])
  })

  it('does not change the original array', () => {
    const ids = [1, 25]

    const added = toggleFavorite(ids, 4)
    const removed = toggleFavorite(ids, 25)

    expect(ids).toEqual([1, 25])
    expect(added).not.toBe(ids)
    expect(removed).not.toBe(ids)
  })
})

describe('loadFavorites', () => {
  it('returns [] when nothing is saved', () => {
    const { storage } = makeStorage()
    expect(loadFavorites(storage)).toEqual([])
  })

  it('reads back the saved ids', () => {
    const { storage } = makeStorage({ [FAVORITES_KEY]: '[25,1]' })
    expect(loadFavorites(storage)).toEqual([25, 1])
  })

  it('returns [] when the saved data is not valid JSON', () => {
    const { storage } = makeStorage({ [FAVORITES_KEY]: '{oops' })
    expect(loadFavorites(storage)).toEqual([])
  })

  it('drops values that are not valid ids, and duplicates', () => {
    const { storage } = makeStorage({
      [FAVORITES_KEY]: '[25, "pikachu", -1, 1.5, null, 25, 4]',
    })
    expect(loadFavorites(storage)).toEqual([25, 4])
  })
})

describe('saveFavorites', () => {
  it('saves the ids as JSON so loadFavorites can read them back', () => {
    const { storage, data } = makeStorage()

    saveFavorites([25, 1], storage)

    expect(data[FAVORITES_KEY]).toBe('[25,1]')
    expect(loadFavorites(storage)).toEqual([25, 1])
  })

  it('does not crash when storage throws (blocked or full)', () => {
    const broken: FavoritesStorage = {
      getItem: () => null,
      setItem: () => {
        throw new Error('QuotaExceededError')
      },
    }

    expect(() => saveFavorites([25], broken)).not.toThrow()
  })
})
