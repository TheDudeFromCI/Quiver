import { Graph } from '../Graph'

/**
 * An executable function within a Node Graph.
 *
 * @remarks
 *
 * A node has a variable number of
 * staticlly typed inputs and a variable number of stateically typed outputs.
 * A node represents a pure function that takes in data and modifies it to
 * produce some output data.
 */
export interface Node {
  /**
   * @returns The x location of the node in world units.
   */
  x: () => number

  /**
   * @returns The y location of the node in world units.
   */
  y: () => number

  /**
   * @returns The width of the node in world units.
   */
  width: () => number

  /**
   * @returns The height of the node in world units.
   */
  height: () => number

  /**
   * @returns The name of this node. This is used as the unquie identifier of the
   * node within a graph.
   */
  name: () => string

  /**
   * @returns The graph that this node is part of.
   */
  graph: () => Graph

  /**
   * Renames this node to a new identifier.
   * @param name - The new name for this node.
   * @throws {@link nodegraph-logic#IdentifierError} If there is already an existing node in
   * graph this this name.
   */
  rename: (name: string) => void

  moveTo: (x: number, y: number) => void

  setSize: (width: number, height: number) => void
}
