import { Option, Result } from 'ts-results'
import { IdentifierError } from './Errors'
import { Module } from './Module'

/**
 * A collection of currently loaded modules.
 *
 * @remarks
 *
 * When working with a node graph, it may only be created within a context and
 * may only use data types or functions defined within modules that are loaded
 * in that same context. This helps to add a central authority for how loaded
 * information within a graph may communicate with itself without the outside
 * of seperate contexts. Each context may contain any number of loaded graphs,
 * modules, data types, and functions.
 *
 * @public
 */
export interface Context {
  /**
   * Creates a new module within this context.
   *
   * @returns The newly created module, or an {@link IdentifierError} if there
   *          is already a module with the given name.
   */
  createModule: (name: string) => Result<Module, IdentifierError>

  /**
   * Tries to find the module with the given name.
   *
   * @param name - The name of the module to look for. (Case sensitive)
   * @returns The module with the given name, or None if the module could not
   *          be found.
   */
  findModule: (name: string) => Option<Module>

  /**
   * Gets a readonly array of all modules that are currently in this context.
   *
   * @returns A readonly array of modules.
   */
  modules: () => readonly Module[]
}
