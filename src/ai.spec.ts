import { expect } from 'chai'
import { generateTree, generateNextBoards, calculateBestNextMoves } from './ai'
import { CellState, Board } from './board'
import { Tree, Node } from './tree'

// @TODO refactor boards
describe('AI', () => {
  describe('generateTree', () => {
    it('returns an empty tree if the start board is full', () => {
      const board = new Board([
        CellState.CROSS, CellState.CIRCLE, CellState.CROSS,
        CellState.CROSS, CellState.CIRCLE, CellState.CIRCLE,
        CellState.CIRCLE, CellState.CROSS, CellState.CROSS
      ])
      const root = new Tree(board)

      const tree = root.clone()

      expect(generateTree(root, CellState.CROSS)).to.deep.equal(tree)
    })

    it('returns the options if its only one level deep', () => {
      const board = new Board([
        CellState.CROSS, CellState.CIRCLE, CellState.CROSS,
        CellState.CROSS, CellState.CIRCLE, CellState.CIRCLE,
        CellState.CIRCLE, CellState.EMPTY, CellState.CROSS
      ])
      const root = new Tree(board)

      const tree = root.clone()
      const node = new Node(board.clone().setCell(1, 2, CellState.CROSS))
      tree.addChild(node)

      expect(generateTree(root, CellState.CROSS)).to.deep.equal(tree)
    })

    it('returns the options if its multiple levels deep', () => {
      const boards = [
        // [0] -> starting board
        new Board([
          CellState.CIRCLE, CellState.CROSS, CellState.EMPTY,
          CellState.CROSS, CellState.CIRCLE, CellState.EMPTY,
          CellState.CROSS, CellState.CIRCLE, CellState.CROSS
        ]),
        // [1] -> change (2, 0) from [0]
        new Board([
          CellState.CIRCLE, CellState.CROSS, CellState.CIRCLE,
          CellState.CROSS, CellState.CIRCLE, CellState.EMPTY,
          CellState.CROSS, CellState.CIRCLE, CellState.CROSS
        ]),
        // [2] -> change (2, 1) from [1]
        new Board([
          CellState.CIRCLE, CellState.CROSS, CellState.CIRCLE,
          CellState.CROSS, CellState.CIRCLE, CellState.CROSS,
          CellState.CROSS, CellState.CIRCLE, CellState.CROSS
        ]),
        // [3] -> change (1, 2) from [0]
        new Board([
          CellState.CIRCLE, CellState.CROSS, CellState.EMPTY,
          CellState.CROSS, CellState.CIRCLE, CellState.CIRCLE,
          CellState.CROSS, CellState.CIRCLE, CellState.CROSS
        ]),
        // [4] -> change (2, 0) from [3]
        new Board([
          CellState.CIRCLE, CellState.CROSS, CellState.CROSS,
          CellState.CROSS, CellState.CIRCLE, CellState.CIRCLE,
          CellState.CROSS, CellState.CIRCLE, CellState.CROSS
        ])
      ]

      let nodes: Node<Board>[] = []
      nodes[0] = new Tree(boards[0])
      nodes[1] = new Node(boards[1])
      nodes[2] = new Node(boards[2])
      nodes[3] = new Node(boards[3])
      nodes[4] = new Node(boards[4])
      nodes[0].addChildren([nodes[1], nodes[3]])
      nodes[1].addChild(nodes[2])
      nodes[3].addChild(nodes[4])

      expect(generateTree(new Tree(boards[0]), CellState.CIRCLE)).to.deep.equal(nodes[0])
    })
  })

  describe('generateNextOptions', () => {
    it('should return an empty array if the board is full', () => {
      const board = new Board([
        CellState.CROSS, CellState.CIRCLE, CellState.CROSS,
        CellState.CROSS, CellState.CIRCLE, CellState.CIRCLE,
        CellState.CIRCLE, CellState.CROSS, CellState.CROSS
      ])

      expect(generateNextBoards(board, CellState.EMPTY)).to.deep.equal([])
    })

    it('returns an empty array if the board has won', () => {
      const board = new Board([
        CellState.CROSS, CellState.CIRCLE, CellState.CROSS,
        CellState.CROSS, CellState.CIRCLE, CellState.CIRCLE,
        CellState.CIRCLE, CellState.CROSS, CellState.CROSS
      ])

      expect(generateNextBoards(board, CellState.EMPTY)).to.deep.equal([])
    })

    it('returns the possible board if there is 1 option left', () => {
      const board = new Board([
        CellState.EMPTY, CellState.CIRCLE, CellState.CROSS,
        CellState.CROSS, CellState.CIRCLE, CellState.CIRCLE,
        CellState.CIRCLE, CellState.CROSS, CellState.CROSS
      ])

      expect(generateNextBoards(board, CellState.CIRCLE)).to.deep.equal([
        board.clone().setCell(0, 0, CellState.CIRCLE)
      ])
    })

    it('returns all the possible boards if there are options left', () => {
      const board = new Board([
        CellState.EMPTY, CellState.CIRCLE, CellState.CROSS,
        CellState.CROSS, CellState.CIRCLE, CellState.CIRCLE,
        CellState.CIRCLE, CellState.CROSS, CellState.EMPTY
      ])

      expect(generateNextBoards(board, CellState.CROSS)).to.deep.equal([
        board.clone().setCell(0, 0, CellState.CROSS),
        board.clone().setCell(2, 2, CellState.CROSS)
      ])
    })

    it('does not change the value of board', () => {
      const board = new Board()

      generateNextBoards(board, CellState.CROSS)

      expect(board).to.deep.equal(new Board())
    })
  })

  describe('bestNextMove', () => {
    it('returns -1 if the game has allready won', () => {
      const board = new Board([
        CellState.CIRCLE, CellState.CROSS, CellState.EMPTY,
        CellState.CIRCLE, CellState.CROSS, CellState.CROSS,
        CellState.CIRCLE, CellState.EMPTY, CellState.EMPTY
      ])

      expect(calculateBestNextMoves(new Node(board), CellState.CROSS)).to.equal(-1)
    })

    it('returns -1 if the board is full', () => {
      const board = new Board([
        CellState.CIRCLE, CellState.CROSS, CellState.CIRCLE,
        CellState.CIRCLE, CellState.CROSS, CellState.CROSS,
        CellState.CROSS, CellState.CIRCLE, CellState.CROSS
      ])


      expect(calculateBestNextMoves(new Node(board), CellState.CROSS)).to.equal(-1)
    })
  })
})
