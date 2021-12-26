import { Option, Result } from 'ts-results'
import { Context } from './Context'
import { DataType } from './DataType'
import { IdentifierError } from './Errors'

/**
 * A container for a set of datatypes and node types that are defined together.
 *
 * @public
 */
export interface Module {
  /**
   * Gets the name of this module.
   *
   * @remarks
   *
   * This should be a unquie identifier. No two modules with the same name can
   * be loaded into a context at the same time.
   *
   * If a module is nested inside of another module, it's name is formatted as
   * `module_a.module_b`.
   *
   * @returns The name.
   *
   * @see {@link Context}, {@link rename}
   */
  name: () => string

  /**
   * Gets the context that this module is defined in.
   *
   * @returns The context.
   */
  context: () => Context

  /**
   * Tries to find a data type in this module with the given name.
   *
   * @param name - The name of the data type. (Case sensitive)
   * @returns The data type with the given name, or None if it could not be
   *          found.
   *
   * @see {@link DataType}
   */
  findDataType: (name: string) => Option<DataType>

  /**
   * Renames this module to another name.
   *
   * @returns An {@link IdentifierError} if there is already a module in the
   *          context this module is in with the given name.
   *
   * @see {@link name}
   */
  rename: (name: string) => Result<void, IdentifierError>
}
