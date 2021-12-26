[nodegraph-logic](../README.md) / [Exports](../modules.md) / Context

# Interface: Context

A collection of currently loaded modules.

**`remarks`**

When working with a node graph, it may only be created within a context and
may only use data types or functions defined within modules that are loaded
in that same context. This helps to add a central authority for how loaded
information within a graph may communicate with itself without the outside
of seperate contexts. Each context may contain any number of loaded graphs,
modules, data types, and functions.

## Table of contents

### Methods

- [createModule](Context.md#createmodule)
- [findModule](Context.md#findmodule)
- [modules](Context.md#modules)

## Methods

### createModule

▸ **createModule**(`name`): `Result`<[`Module`](Module.md), [`IdentifierError`](../classes/IdentifierError.md)\>

Creates a new module within this context.

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Result`<[`Module`](Module.md), [`IdentifierError`](../classes/IdentifierError.md)\>

The newly created module, or an [IdentifierError](../classes/IdentifierError.md) if there
         is already a module with the given name.

#### Defined in

[packages/nodegraph-logic/src/lib/api/Context.ts:26](https://github.com/TheDudeFromCI/Quiver/blob/1737dba/packages/nodegraph-logic/src/lib/api/Context.ts#L26)

___

### findModule

▸ **findModule**(`name`): `Option`<[`Module`](Module.md)\>

Tries to find the module with the given name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the module to look for. (Case sensitive) |

#### Returns

`Option`<[`Module`](Module.md)\>

The module with the given name, or None if the module could not
         be found.

#### Defined in

[packages/nodegraph-logic/src/lib/api/Context.ts:35](https://github.com/TheDudeFromCI/Quiver/blob/1737dba/packages/nodegraph-logic/src/lib/api/Context.ts#L35)

___

### modules

▸ **modules**(): readonly [`Module`](Module.md)[]

Gets a readonly array of all modules that are currently in this context.

#### Returns

readonly [`Module`](Module.md)[]

A readonly array of modules.

#### Defined in

[packages/nodegraph-logic/src/lib/api/Context.ts:42](https://github.com/TheDudeFromCI/Quiver/blob/1737dba/packages/nodegraph-logic/src/lib/api/Context.ts#L42)
