import { expect } from 'chai'
import { fac } from './util'

describe('util', () => {
  describe('fac', () => {
    it('throw an error when n < 0', () => {
      expect(fac.bind(-1)).to.throw(RangeError)
    })

    it('returns the correct value with a possitive number', () => {
      expect(fac(0)).to.equal(1)
      expect(fac(1)).to.equal(1)
      expect(fac(2)).to.equal(2)
      expect(fac(10)).to.equal(3628800)
    })
  })
})
