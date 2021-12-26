import { Err, Ok, Result } from 'ts-results'
import { Node } from './api/Node'
import { IdentifierError, InvalidArgumentError } from './Errors'
import { Graph } from './Graph'

/**
 * An implementation of the Node interface.
 *
 * @package
 * @memberof NodeImpl
 */
export class NodeImpl implements Node {
  private readonly _graph: Graph
  private _name = ''
  private _x = 0
  private _y = 0
  private _width = 0
  private _height = 0

  /**
   * Creates an instance of NodeImpl.
   *
   * @param graph - The graph that the node is being created in.
   * @param name - The name of this node.
   * @returns - {@link Result}<{@link Node}> Returns the node that was just
   *            created.
   *          - {@link Result}<{@link IdentifierError}> If there is already
   *            a node in the graph with the given name.
   */
  static new (graph: Graph, name: string): Result<NodeImpl, IdentifierError> {
    const node = new NodeImpl(graph)

    const result = node.rename(name)
    if (result.err) {
      return Err(result.val)
    }

    return Ok(node)
  }

  /**
   * Creates an instance of NodeImpl.
   *
   * @param graph - The graph that this node is being created in.
   */
  private constructor (graph: Graph) {
    this._graph = graph
  }

  /**
   * {@inheritdoc}
   */
  x (): number {
    return this._x
  }

  /**
   * {@inheritdoc}
   */
  y (): number {
    return this._y
  }

  /**
   * {@inheritdoc}
   */
  width (): number {
    return this._width
  }

  /**
   * {@inheritdoc}
   */
  height (): number {
    return this._height
  }

  /**
   * {@inheritdoc}
   */
  name (): string {
    return this._name
  }

  /**
   * {@inheritdoc}
   */
  graph (): Graph {
    return this._graph
  }

  /**
   * {@inheritdoc}
   */
  rename (name: string): Result<void, IdentifierError> {
    if (this._graph.findNode(name).some) {
      return Err(new IdentifierError(`There is already a node with the name '${name}'!`))
    }

    this._name = name
    return Ok.EMPTY
  }

  /**
   * {@inheritdoc}
   */
  moveTo (x: number, y: number): void {
    this._x = x
    this._y = y
  }

  /**
   * {@inheritdoc}
   */
  setSize (width: number, height: number): Result<void, InvalidArgumentError> {
    if (width < 1 || height < 1) {
      return Err(new InvalidArgumentError('Width and height cannot be less than 1 unit!'))
    }

    this._width = width
    this._height = height
    return Ok.EMPTY
  }
}
