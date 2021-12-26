import { Err, None, Ok, Option, Result, Some } from 'ts-results'
import { Context } from './api/Context'
import { DataType } from './api/DataType'
import { IdentifierError } from './api/Errors'
import { Module } from './api/Module'

/**
 * An implementation of the module interface.
 *
 * @memberof Module
 * @package
 */
export class ModuleImpl implements Module {
  private readonly _context: Context
  private readonly dataTypes: DataType[] = []
  private _name = ''

  /**
     * Creates an instance of ModuleImpl.
     *
     * @param context - The context this module was created in.
     * @param name - The name of this module.
     * @returns The new module, or an {@link IdentifierError} if there is
     *          already a module in the provided context with the given name.
     */
  static new (context: Context, name: string): Result<ModuleImpl, IdentifierError> {
    const module = new ModuleImpl(context)

    const result = module.rename(name)
    if (result.err) {
      return Err(result.val)
    }

    return Ok(module)
  }

  /**
     * Creates a new instance of ModuleImpl.
     *
     * @param context - The context this module is defined in.
     */
  private constructor (context: Context) {
    this._context = context
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
  context (): Context {
    return this._context
  }

  /**
     * {@inheritdoc}
    */
  findDataType (name: string): Option<DataType> {
    for (const dataType of this.dataTypes) {
      if (dataType.name() === name) {
        return Some(dataType)
      }
    }

    return None
  }

  /**
     * {@inheritdoc}
     */
  rename (name: string): Result<void, IdentifierError> {
    if (name === this._name) return Ok.EMPTY

    if (this._context.findModule(name).some) {
      return Err(new IdentifierError(`There is already a module with the name '${name}'!`))
    }

    this._name = name
    return Ok.EMPTY
  }
}
