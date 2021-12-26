import { Result } from 'ts-results'
import { IdentifierError } from './Errors'
import { Module } from './Module'

/**
 * An abstract identifier that indicates how a unit of data should be used.
 *
 * @public
 */
export interface DataType {
  /**
   * Gets the name of this data type.
   *
   * @remarks
   *
   * This should be a unquie identifier within a module.
   *
   * @returns The name.
   *
   * @see {@link Module}, {@link rename}
   */
  name: () => string

  /**
   * Gets the module that this data type is defined in.
   *
   * @returns The module.
   */
  module: () => Module

  /**
   * Sets a new name for this data type.
   *
   * @returns An {@link IdentifierError} if there is already a data type in the
   *          module this data type is in with the given name.
   *
   * @see {@link name}
   */
  rename: (name: string) => Result<void, IdentifierError>
}
