import { NodeImpl } from './impl/NodeImpl'
import { Node } from './api/Node'

export class Graph {
  private readonly nodes: NodeImpl[] = []

  addNode (name: string, x: number, y: number): Node {
    const node = new NodeImpl(this, name)
    node.moveTo(x, y)

    this.nodes.push(node)
    return node
  }

  findNode (name: string): Node | null {
    for (const node of this.nodes) {
      if (node.name() === name) return node
    }

    return null
  }
}
