import { Node } from '../api/Node'
import { Graph } from '../Graph'

export class NodeImpl implements Node {
  public readonly graph: Graph

  private _name = ''
  private _x = 0
  private _y = 0
  private _width = 0
  private _height = 0

  /**
   * Creates an instance of NodeImpl.
   * @param graph
   * @param name
   * @memberof NodeImpl
   */
  constructor (graph: Graph, name: string) {
    this.graph = graph
    this.rename(name)
  }

  get x (): number {
    return this._x
  }

  get y (): number {
    return this._y
  }

  get width (): number {
    return this._width
  }

  get height (): number {
    return this._height
  }

  get name (): string {
    return this._name
  }

  rename (name: string): void {
    if (this.graph.findNode(name) != null) {
      throw new Error(`There is already a node with the name '${name}'!`)
    }

    this._name = name
  }

  moveTo (x: number, y: number): void {
    this._x = x
    this._y = y
  }

  setSize (width: number, height: number): void {
    this._width = width
    this._height = height
  }
}
