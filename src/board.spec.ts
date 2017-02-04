import { expect } from 'chai'
import { CellState, Board } from './board'

// @todo: refactor the boards?
describe('Board', () => {
  describe('getRow()', () => {
    it('throws RangeError when the row does not exist', () => {
      let board = new Board()

      expect(board.getRow.bind(board, 3)).to.throw(RangeError)
    })

    it('returns the correct values', () => {
      let board = new Board([
        CellState.CIRCLE, CellState.CIRCLE, CellState.CIRCLE,
        CellState.CROSS, CellState.CROSS, CellState.EMPTY,
        CellState.CROSS, CellState.EMPTY, CellState.EMPTY
      ])

      expect(board.getRow(1)).to.deep.equal([CellState.CROSS, CellState.CROSS, CellState.EMPTY])
    })
  })

  describe('getColumn()', () => {
    it('throws RangeError when the row does not exist', () => {
      let board = new Board()

      expect(board.getColumn.bind(board, 3)).to.throw(RangeError)
    })

    it('returns the correct values', () => {
      let board = new Board([
        CellState.CIRCLE, CellState.CIRCLE, CellState.CIRCLE,
        CellState.CROSS, CellState.CROSS, CellState.EMPTY,
        CellState.CROSS, CellState.EMPTY, CellState.EMPTY
      ])

      expect(board.getColumn(1)).to.deep.equal([CellState.CIRCLE, CellState.CROSS, CellState.EMPTY])
    })
  })

  describe('hasWon()', () => {
    it('returns true if row is full of circles', () => {
      let board = new Board([
        CellState.CIRCLE, CellState.CIRCLE, CellState.CIRCLE,
        CellState.CROSS, CellState.CROSS, CellState.EMPTY,
        CellState.CROSS, CellState.EMPTY, CellState.EMPTY
      ])

      expect(board.hasWon()).to.be.true
    })

    it('returns true if row is full of crosses', () => {
      let board = new Board([
        CellState.CROSS, CellState.CROSS, CellState.CROSS,
        CellState.CIRCLE, CellState.CIRCLE, CellState.EMPTY,
        CellState.CIRCLE, CellState.EMPTY, CellState.EMPTY
      ])

      expect(board.hasWon()).to.be.true
    })

    it('returns true if a column is full of circles', () => {
      let board = new Board([
        CellState.CIRCLE, CellState.CROSS, CellState.EMPTY,
        CellState.CIRCLE, CellState.CROSS, CellState.EMPTY,
        CellState.CIRCLE, CellState.EMPTY, CellState.EMPTY
      ])


      expect(board.hasWon()).to.be.true
    })

    it('returns true if a column is full of crosses', () => {
      let board = new Board([
        CellState.CROSS, CellState.CIRCLE, CellState.EMPTY,
        CellState.CROSS, CellState.CIRCLE, CellState.EMPTY,
        CellState.CROSS, CellState.EMPTY, CellState.EMPTY
      ])

      expect(board.hasWon()).to.be.true
    })

    it('returns true if a the first diagonal is full of circles', () => {
      let board = new Board([
        CellState.CIRCLE, CellState.EMPTY, CellState.CROSS,
        CellState.EMPTY, CellState.CIRCLE, CellState.EMPTY,
        CellState.CROSS, CellState.EMPTY, CellState.CIRCLE
      ])

      expect(board.hasWon()).to.be.true
    })

    it('returns true if a the first diagonal is full of crosses', () => {
      let board = new Board([
        CellState.CROSS, CellState.EMPTY, CellState.CIRCLE,
        CellState.EMPTY, CellState.CROSS, CellState.EMPTY,
        CellState.CIRCLE, CellState.EMPTY, CellState.CROSS
      ])

      expect(board.hasWon()).to.be.true
    })

    it('returns true if a the second diagonal is full of circles', () => {
      let board = new Board([
        CellState.CROSS, CellState.EMPTY, CellState.CIRCLE,
        CellState.EMPTY, CellState.CIRCLE, CellState.EMPTY,
        CellState.CIRCLE, CellState.EMPTY, CellState.CROSS
      ])

      expect(board.hasWon()).to.be.true
    })

    it('returns true if a the second diagonal is full of crosses', () => {
      let board = new Board([
        CellState.CIRCLE, CellState.EMPTY, CellState.CROSS,
        CellState.EMPTY, CellState.CROSS, CellState.EMPTY,
        CellState.CROSS, CellState.EMPTY, CellState.CIRCLE
      ])

      expect(board.hasWon()).to.be.true
    })

    it('returns false if there is no win', () => {
      let board = new Board([
        CellState.CIRCLE, CellState.CROSS, CellState.CIRCLE,
        CellState.CIRCLE, CellState.CROSS, CellState.CROSS,
        CellState.CROSS, CellState.CIRCLE, CellState.CIRCLE
      ])

      expect(board.hasWon()).to.be.false
    })
  })

  describe('emptyIndexes', () => {
    it('returns an empty array when the board is full', () => {
      let board = new Board([
        CellState.CIRCLE, CellState.CROSS, CellState.CIRCLE,
        CellState.CROSS, CellState.CIRCLE, CellState.CROSS,
        CellState.CROSS, CellState.CROSS, CellState.CIRCLE
      ])

      expect(board.getEmptyCellIndexes()).to.deep.equal([])
    })

    it('returns the correct possibility when there is only one choice left', () => {
      let board = new Board([
        CellState.CROSS, CellState.EMPTY, CellState.CROSS,
        CellState.CROSS, CellState.CIRCLE, CellState.CIRCLE,
        CellState.CIRCLE, CellState.CROSS, CellState.CIRCLE
      ])

      expect(board.getEmptyCellIndexes()).to.deep.equal([1])
    })

    it('returns the correct possibilities when there are two choices left', () => {
      let board = new Board([
        CellState.CIRCLE, CellState.EMPTY, CellState.CIRCLE,
        CellState.CROSS, CellState.CIRCLE, CellState.CROSS,
        CellState.CROSS, CellState.CROSS, CellState.EMPTY
      ])

      expect(board.getEmptyCellIndexes()).to.deep.equal([1, 8])
    })

    it('returns the correct possibilities when the board has more than 2 choices left', () => {
      let board = new Board([
        CellState.CIRCLE, CellState.CIRCLE, CellState.EMPTY,
        CellState.CROSS, CellState.EMPTY, CellState.EMPTY,
        CellState.CROSS, CellState.EMPTY, CellState.EMPTY
      ])

      expect(board.getEmptyCellIndexes()).to.deep.equal([2, 4, 5, 7, 8])
    })
  })

})
