import { CellState, Board } from './board'
import * as readline from './es6-readline'

export const enum GameState {
  PLAYER,
  AI
}

export class Game {
  private state = GameState.PLAYER
  private board = new Board()

  async run() {
    while (!(this.board.hasWon() || this.board.isFull())) {
      this.draw()

      if (this.state === GameState.PLAYER) {
        readline.open()
        const xString = await readline.question('What is the x-coordinate: ')
        const yString = await readline.question('What is the y-coorindate: ')
        readline.close()
        try {
          const x = Number.parseInt(xString, 10)
          const y = Number.parseInt(yString, 10)
          this.board.setCell(x, y, CellState.CIRCLE)
        } catch (err) {
          console.error(err.message)
          continue
        }
      } else {
        // AI
        console.log('AI is doing stuff')
      }

      this.switchState()
    }

    if (this.board.hasWon()) {
      this.switchState()
      if (this.state === GameState.PLAYER) {
        console.log('Congrats, you won')
      } else {
        console.log('The enemy won')
      }
    } else {
      console.log('To bad the enemy won')
    }
  }

  draw() {
    // Get the cells and replace them with a readable interface for the players
    const cells = this.board.getCells().map(state => {
      switch (state) {
        case CellState.EMPTY: return ' '
        case CellState.CROSS: return 'X'
        case CellState.CIRCLE: return 'O'
        default: throw new Error('Unknown cellstate')
      }
    })

    console.log(`     0   1   2`)
    console.log(`   /---|---|---\\`)
    console.log(`0  | ${cells[0]} | ${cells[1]} | ${cells[2]} |`)
    console.log(`   |---|---|---|`)
    console.log(`1  | ${cells[3]} | ${cells[4]} | ${cells[5]} |`)
    console.log(`   |---|---|---|`)
    console.log(`2  | ${cells[6]} | ${cells[7]} | ${cells[8]} |`)
    console.log(`   \\---|---|---/`)
  }

  switchState() {
    this.state = switchGameState(this.state)
  }
}

export function switchGameState(state: GameState): GameState {
  return state === GameState.PLAYER ? GameState.AI : GameState.PLAYER
}

