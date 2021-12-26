import { Err, Ok, Result } from 'ts-results'
import { IdentifierError } from './api/Errors'
import { DataType } from './api/DataType'
import { Module } from './api/Module'

/**
 * An implementation of the DataType interface.
 *
 * @memberof DataType
 * @package
 */
export class DataTypeImpl implements DataType {
  private readonly _module: Module
  private _name = ''

  /**
   * Creates an instance of DataTypeImpl.
   *
   * @param module - The module this data type was created in.
   * @param name - The name of this data type.
   * @returns The new data type, or an {@link IdentifierError} if there is
   *          already a data type in the provided module with the given name.
   */
  static new (module: Module, name: string): Result<DataTypeImpl, IdentifierError> {
    const dataType = new DataTypeImpl(module)

    const result = dataType.rename(name)
    if (result.err) {
      return Err(result.val)
    }

    return Ok(dataType)
  }

  /**
   * Creates an instance of DataTypeImpl.
   *
   * @param module - The module this data type was created in.
   */
  private constructor (module: Module) {
    this._module = module
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
  module (): Module {
    return this._module
  }

  /**
   * {@inheritdoc}
   */
  rename (name: string): Result<void, IdentifierError> {
    if (name === this._name) return Ok.EMPTY

    if (this._module.findDataType(name).some) {
      return Err(new IdentifierError(`There is already a data type with the name '${name}'!`))
    }

    this._name = name
    return Ok.EMPTY
  }
}
