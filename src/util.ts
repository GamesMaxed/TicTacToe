import { cloneDeep } from 'lodash'

const cache = new Map<number, number>([[0, 1], [1, 1]])
/**
 * Fac that has a cache for performance. By initializing the cahce with fac(0) = 1 and fac(1) = 1 we dont need to check for 0 and 1
 * This means there is no branch prediction performace issues there
 */
export function fac(n: number): number {
  if (cache.has(n)) {
    return cache.get(n) as number
  }
  if (n < 0) {
    throw new RangeError('N has to be positive')
  }
  const result = n * fac(n - 1)
  cache.set(n, result)
  return result
}

// Extend Cloneable to be able to clone an object
export interface ICloneable {
  clone(): this
}
export class Cloneable implements ICloneable {
  clone() {
    return cloneDeep(this)
  }
}
