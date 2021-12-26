import { Result, Option, Ok, Err, Some, None } from 'ts-results'
import { Context } from './api/Context'
import { IdentifierError } from './api/Errors'
import { Module } from './api/Module'
import { ModuleImpl } from './ModuleImpl'

/**
 * An implementation of the Context interface.
 *
 * @memberof Context
 * @package
 */
export class ContextImpl implements Context {
  private readonly _modules: Module[] = []

  /**
   * {@inheritdoc}
   */
  createModule (name: string): Result<Module, IdentifierError> {
    const moduleResult = ModuleImpl.new(this, name)
    if (moduleResult.err) {
      return Err(moduleResult.val)
    }

    const module = moduleResult.unwrap()
    this._modules.push(module)
    return Ok(module)
  }

  /**
   * {@inheritdoc}
   */
  findModule (name: string): Option<Module> {
    for (const module of this._modules) {
      if (module.name() === name) {
        return Some(module)
      }
    }

    return None
  }

  /**
   * {@inheritdoc}
   */
  modules (): readonly Module[] {
    return this._modules
  }
}
