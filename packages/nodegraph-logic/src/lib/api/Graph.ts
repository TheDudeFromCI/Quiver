import { Node } from './Node'
import { Option, Result } from 'ts-results'
import { IdentifierError } from './Errors'

/**
 * A container for a set of function nodes to show relationships.
 *
 * @remarks
 *
 * A Graph, or NodeGraph, is a type of diagram that shows the relationship
 * of multiple function instances to display how information should be
 * transformed as it is passed through the graph. Each graph can be thought of
 * as a function in itself that takes in a set of input data types, or constant
 * data types, and transforms them in order to produce an output data type. The
 * inputs, constants, and outputs are usually also represented as nodes within
 * this graph.
 *
 * A graph may not contain circular depdencies between nodes.
 *
 * @public
 */
export interface Graph {
  /**
   * Creates a new node within this graph.
   *
   * @param name - The name of this node.
   * @param x - The x position of this node in world units.
   * @param y - The y position of this node in world units.
   *
   * @returns The newly created node, or an {@link IdentifierError} if there is
   *          already a node with the given name.
   */
  addNode: (name: string, x: number, y: number) => Result<Node, IdentifierError>

  /**
   * Finds a node in this graph with the given name.
   *
   * @remarks
   *
   * This function is case sensitive.
   *
   * @param name - The name of the node to find.
   * @returns The node with the given name, or null if there is no node with
   *          that name.
   */
  findNode: (name: string) => Option<Node>
}
