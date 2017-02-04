import { Cloneable } from './util'

export class Node<T> extends Cloneable {
  public children: Node<T>[] = []
  public parent?: Node<T>

  /**
   * If parent is null it means it's the root of the tree
   */
  constructor(public value: T) {
    super()
  }

  isRoot() {
    return typeof this.parent === 'undefined'
  }

  addChild(child: Node<T>) {
    // @todo: look if child allready has parent and if so it needs to throw an error?
    this.children.push(child)
    child.parent = this
    return this
  }

  addChildren(children: Node<T>[]) {
    for (const child of children) {
      this.addChild(child)
    }
    return this
  }
}

/**
 * Special kind of node (mainly the root)
 */
export class Tree<T> extends Node<T> {
  constructor(value: T) {
    super(value)
  }

  // Just always return true, no need to do any check
  isRoot() {
    return true
  }
}

/**
 * Generic function to visit all the nodes  
 * T: type of node we are visiting  
 * @TODO look into return types 
 */
export function nodeVisitor<T>(callback: (node: Node<T>) => void) {
  return (node: Node<T>) => {
    callback(node)
    node.children.forEach((child: Node<T>) => {
      nodeVisitor(callback)(node)
    })
  }
}

export const logNodeVisitor = nodeVisitor<any>((node) => console.log(node.value))

// @TODO: tests
export function deepCountChildren(node: Node<any>) {
  let sum = 0
  nodeVisitor(() => sum++)(node)
  return sum
}

// @TODO map values of children function (using nodeVisitor)
