import { expect } from 'chai'
import { Tree, Node } from './tree'

describe('Tree', () => {
  describe('Node', () => {
    it('isRoot()', () => {
      const root = new Node(1)
      const child = new Node(2)
      root.addChild(child)

      expect(root.isRoot()).to.be.true
      expect(child.isRoot()).to.be.false
    })
  })

  describe('Tree', () => {
    // isRoot should always return true
    it('isRoot()', () => {
      const tree = new Tree(1)

      expect(tree.isRoot()).to.be.true
    })
  })
})

