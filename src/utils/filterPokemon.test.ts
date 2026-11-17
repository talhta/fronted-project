import { describe, expect, it } from 'vitest'
import { filterPokemonByName } from './filterPokemon'
import type { Pokemon } from '../types/pokemon'

const list: Pokemon[] = [
  { id: 1, name: 'bulbasaur', image: '1.png' },
  { id: 4, name: 'charmander', image: '4.png' },
  { id: 25, name: 'pikachu', image: '25.png' },
  { id: 26, name: 'raichu', image: '26.png' },
]

const names = (result: Pokemon[]) => result.map((p) => p.name)

describe('filterPokemonByName', () => {
  it('returns the whole list for an empty query', () => {
    expect(filterPokemonByName(list, '')).toEqual(list)
  })

  it('returns the whole list for a query of only spaces', () => {
    expect(filterPokemonByName(list, '   ')).toEqual(list)
  })

  it('matches any part of the name, not just the start', () => {
    expect(names(filterPokemonByName(list, 'pika'))).toEqual(['pikachu'])
    expect(names(filterPokemonByName(list, 'chu'))).toEqual(['pikachu', 'raichu'])
  })

  it('ignores upper/lower case and outer spaces', () => {
    expect(names(filterPokemonByName(list, '  PIKA '))).toEqual(['pikachu'])
  })

  it('returns an empty list when nothing matches', () => {
    expect(filterPokemonByName(list, 'zzz')).toEqual([])
  })

  it('does not change the original list', () => {
    const copy = [...list]

    const result = filterPokemonByName(list, '')
    filterPokemonByName(list, 'pika')

    expect(list).toEqual(copy)
    expect(result).not.toBe(list)
  })
})
