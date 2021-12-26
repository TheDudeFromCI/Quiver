import { NodeImpl } from './NodeImpl'
import { Node } from './api/Node'
import { Graph } from './api/Graph'
import { IdentifierError } from './api/Errors'
import { Err, None, Ok, Option, Result, Some } from 'ts-results'

/**
 * An implementation of the Graph interface.
 *
 * @memberof Graph
 * @package
 */
export class GraphImpl implements Graph {
  private readonly nodes: Node[] = []

  /**
   * {@inheritdoc}
   */
  addNode (name: string, x: number, y: number): Result<Node, IdentifierError> {
    const nodeResult = NodeImpl.new(this, name)
    if (nodeResult.err) {
      return Err(nodeResult.val)
    }

    const node = nodeResult.unwrap()
    node.moveTo(x, y)

    this.nodes.push(node)
    return Ok(node)
  }

  /**
   * {@inheritdoc}
   */
  findNode (name: string): Option<Node> {
    for (const node of this.nodes) {
      if (node.name() === name) return Some(node)
    }

    return None
  }
}
