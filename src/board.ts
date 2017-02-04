import { Cloneable } from './util'

export const enum CellState {
  EMPTY,
  CROSS,
  CIRCLE
}

export class Board extends Cloneable {
  static EmpyField = [
    CellState.EMPTY, CellState.EMPTY, CellState.EMPTY,
    CellState.EMPTY, CellState.EMPTY, CellState.EMPTY,
    CellState.EMPTY, CellState.EMPTY, CellState.EMPTY
  ]

  constructor(private cells = Board.EmpyField) {
    super()
  }

  static checkIfCoordinatesExist(x: number, y: number) {
    if (x > 2 || y > 2) {
      throw new RangeError('x and y need to be between 0 and 2')
    }
  }

  getCells() {
    return this.cells
  }

  setCell(x: number, y: number, state: CellState) {
    Board.checkIfCoordinatesExist(x, y)
    if (this.getCell(x, y) !== CellState.EMPTY) {
      throw new Error('The given cell is not empty')
    }
    this.cells[y * 3 + x] = state

    return this
  }

  getCell(x: number, y: number) {
    Board.checkIfCoordinatesExist(x, y)
    return this.cells[y * 3 + x]
  }

  getRow(row: number) {
    if (row >= 3) {
      throw new RangeError('Row does not exist')
    }

    let rowArray: CellState[] = []
    for (let i = 0; i < 3; i++) {
      rowArray.push(this.getCell(i, row))
    }
    return rowArray
  }

  getColumn(column: number) {
    if (column >= 3) {
      throw new RangeError('Row does not exist')
    }

    let columnArray: CellState[] = []
    for (let i = 0; i < 3; i++) {
      columnArray.push(this.getCell(column, i))
    }
    return columnArray
  }

  getDiagonals() {
    let first: CellState[] = []
    let second: CellState[] = []

    for (let i = 0; i < 3; i++) {
      first.push(this.getCell(i, i))
      second.push(this.getCell(i, 2 - i))
    }

    return {
      first,
      second
    }
  }

  isFull(): boolean {
    return this.cells.filter(cell => cell === CellState.EMPTY).length === 0
  }

  hasWon(): boolean {
    const check = (array: CellState[]) => {
      let crosses = array.filter(state => state === CellState.CROSS).length
      let circles = array.filter(state => state === CellState.CIRCLE).length
      return crosses === 3 || circles === 3
    }

    const {first, second} = this.getDiagonals()
    if (check(first) || check(second)) {
      return true
    }

    for (let i = 0; i < (3); i++) {
      if (check(this.getRow(i)) || check(this.getColumn(i))) {
        return true
      }
    }

    return false
  }

  amountOfEmptyCells(): number {
    return this.cells.filter((state) => state === CellState.EMPTY).length
  }

  getEmptyCellIndexes(): number[] {
    return this.cells
      .map((value, index) => {
        return { state: value, originalIndex: index }
      })
      .filter(_ => _.state === CellState.EMPTY)
      .map(_ => _.originalIndex)

  }
}
