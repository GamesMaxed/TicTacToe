import { Tree, Node, nodeVisitor } from './tree'
import { CellState, Board } from './board'
import { GameState, switchGameState } from './game'
import { fac } from './util'

// Generate a tree with all the possibilites
// @TODO: try to decouple root from node if possible
export function generateTree(root: Node<Board>, state: CellState): Node<Board> {
  generateNextBoards(root.value, state).forEach(board => {
    const newState = state === CellState.CROSS ? CellState.CIRCLE : CellState.CROSS
    const node = generateTree(new Node(board), newState)
    root.addChild(node)
  })
  return root
}

/**
 * Returns all the possible boards in an array  
 * If the board has allready been won we should return an empty array
 */
export function generateNextBoards(board: Board, state: CellState): Board[] {
  if (board.hasWon()) {
    return []
  }
  return board.getEmptyCellIndexes()
    .map(index => board.clone().setCell(index % 3, Math.floor(index / 3), state))
}


// @TODO rename
interface AIChoiches {
  board: Board,
  wheight: number
}


// @TODO maybe use exceptions for won and full
export function calculateBestNextMoves(tree: Node<Board>, state: CellState): number | Node<AIChoiches> {
  // Node<board> -> Node<AIChoiches>
  /*nodeVisitor(tree, (node) => {
    const board = node.value
    node.value = {
      board,
      wheight: 0
    }
  })*/
  return -1
}
