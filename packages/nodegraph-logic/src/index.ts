import { Context } from './lib/api/Context'
import { ContextImpl } from './lib/ContextImpl'

export * from './lib/api/Context'
export * from './lib/api/DataType'
export * from './lib/api/Errors'
export * from './lib/api/Graph'
export * from './lib/api/Module'
export * from './lib/api/Node'

/**
 * Creates a new Context instance.
 *
 * @returns A new Contextn instance.
 */
export function createContext (): Context {
  return new ContextImpl()
}
