import { IdentifierError, InvalidArgumentError } from '../Errors'
import { Result } from 'ts-results';
import { Graph } from '../Graph'

/**
 * An executable function within a Node Graph.
 *
 * @remarks
 *
 * A node has a variable number of staticlly typed inputs and a variable number
 * of stateically typed outputs. A node represents a pure function that takes in
 * data and modifies it to produce some output data.
 *
 * @public
 */
export interface Node {

  /**
   * Gets the x location of the node in world units.
   *
   * @remarks
   *
   * The x, y location of a node indicates it's bottom left corner.
   *
   * @returns The x location.
   * @see {@link y}
   */
  x(): number

  /**
   * Gets the y location of the node in world units.
   *
   * @remarks
   *
   * The x, y location of a node indicates it's bottom left corner.
   *
   * @returns The y location.
   * @see {@link x}
   */
   y(): number

  /**
   * Gets the width of the node in world units.
   *
   * @returns The width.
   * @see {@link height}
   */
   width(): number

  /**
   * Gets the height of the node in world units.
   *
   * @returns The height.
   * @see {@link width}
   */
   height(): number

  /**
   * Gets the name of this node.
   *
   * @remarks
   * This is used as the unquie identifier of the node within a graph. No two
   * nodes within a graph may have the same name. The only exception to this
   * rule is nodes within nested functions, which are considered to be part
   * of their own graph.
   *
   * @returns The name.
   */
  name(): string

  /**
   * Gets graph that this node is part of.
   *
   * @returns The graph.
   */
  graph(): Graph

  /**
   * Renames this node to a new identifier.
   *
   * @param name - The new name for this node.
   * @returns An {@link IdentifierError} if there is already an existing node in
   *          graph this this name.
   *
   * @see {@link name}
   */
  rename: (name: string) => Result<void, IdentifierError>

  /**
   * Moves this node to a new loction in the graph.
   *
   * @oaram x - The new x location in world units.
   * @oaram y - The new y location in world units.
   *
   * @see {@link x}, {@link y}
   */
  moveTo: (x: number, y: number) => void

  /**
   * Sets this node to a new size.
   *
   * @param width - The new width in world units.
   * @param height - The new height in world units.
   * @returns An {@link InvalidArgumentError} if the width or height is < 1
   *          world unit.
   *
   * @see {@link width}, {@link height}
   */
  setSize: (width: number, height: number) => Result<void, InvalidArgumentError>
}
