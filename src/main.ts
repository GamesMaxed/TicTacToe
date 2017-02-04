/*import { Game } from './game'

(new Game()).run()
*/

import { Node, Tree, nodeVisitor, logNodeVisitor } from './tree'
import { Board, CellState } from './board'

const board = new Board([
  CellState.CROSS, CellState.CIRCLE, CellState.CROSS,
  CellState.CROSS, CellState.CIRCLE, CellState.CIRCLE,
  CellState.CIRCLE, CellState.EMPTY, CellState.CROSS
])
const tree = new Tree(board)


logNodeVisitor(tree)
