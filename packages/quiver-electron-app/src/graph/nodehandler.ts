import { Camera } from './camera'
import { Connection } from './connection'
import { GraphNode } from './node'
import { NodeType } from './libraryhandler'
import { Bounds, Position } from './position'

export class NodeHandler {
  private readonly camera: Camera
  private readonly nodes: GraphNode[] = []
  private connections: Connection[] = []
  private _needsRepaint: boolean = false

  constructor (camera: Camera) {
    this.camera = camera
  }

  get needsRepaint (): boolean {
    return this._needsRepaint
  }

  addNode (type: NodeType): GraphNode {
    const node = new GraphNode(type)
    this.nodes.push(node)
    this._needsRepaint = true
    return node
  }

  addConnection (nodeA: GraphNode, nodeB: GraphNode, plugA: number, plugB: number): Connection {
    const connection = new Connection(nodeA, nodeB, plugA, plugB)
    this.connections.push(connection)
    this._needsRepaint = true
    return connection
  }

  render (): void {
    this._needsRepaint = false

    for (const connection of this.connections) connection.render(this.camera)
    for (const node of this.nodes) node.render(this.camera)
  }

  getNodeAt (worldPos: Position): GraphNode | undefined {
    return this.nodes.find(n => n.pos.x <= worldPos.x && n.pos.x + n.width >= worldPos.x &&
            n.pos.y <= worldPos.y && n.pos.y + n.height >= worldPos.y)
  }

  getNodesInRegion (bounds: Bounds): GraphNode[] {
    return this.nodes.filter(n => this.aabbCollision(n, bounds))
  }

  private aabbCollision (node: GraphNode, bounds: Bounds): boolean {
    return node.x < bounds.x + bounds.width &&
            node.x + node.width > bounds.x &&
            node.y < bounds.y + bounds.height &&
            node.y + node.height > bounds.y
  }

  isNodeDecendantOf (src: GraphNode, tgt: GraphNode): boolean {
    if (src === tgt) return true

    for (const connection of this.connections) {
      if (connection.nodeB === src && this.isNodeDecendantOf(connection.nodeA, tgt)) return true
    }

    return false
  }

  deleteNode (node: GraphNode): void {
    if (!this.nodes.includes(node)) return

    this.nodes.splice(this.nodes.indexOf(node), 1)
    this.connections = this.connections.filter(c => c.nodeA !== node &&
                                                c.nodeB !== node)

    this._needsRepaint = true
  }
}
