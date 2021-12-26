[nodegraph-logic](../README.md) / [Exports](../modules.md) / Module

# Interface: Module

A container for a set of datatypes and node types that are defined together.

## Table of contents

### Methods

- [context](Module.md#context)
- [findDataType](Module.md#finddatatype)
- [name](Module.md#name)
- [rename](Module.md#rename)

## Methods

### context

▸ **context**(): [`Context`](Context.md)

Gets the context that this module is defined in.

#### Returns

[`Context`](Context.md)

The context.

#### Defined in

[packages/nodegraph-logic/src/lib/api/Module.ts:34](https://github.com/TheDudeFromCI/Quiver/blob/1737dba/packages/nodegraph-logic/src/lib/api/Module.ts#L34)

___

### findDataType

▸ **findDataType**(`name`): `Option`<[`DataType`](DataType.md)\>

Tries to find a data type in this module with the given name.

**`see`** [DataType](DataType.md)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the data type. (Case sensitive) |

#### Returns

`Option`<[`DataType`](DataType.md)\>

The data type with the given name, or None if it could not be
         found.

#### Defined in

[packages/nodegraph-logic/src/lib/api/Module.ts:45](https://github.com/TheDudeFromCI/Quiver/blob/1737dba/packages/nodegraph-logic/src/lib/api/Module.ts#L45)

___

### name

▸ **name**(): `string`

Gets the name of this module.

**`remarks`**

This should be a unquie identifier. No two modules with the same name can
be loaded into a context at the same time.

If a module is nested inside of another module, it's name is formatted as
`module_a.module_b`.

**`see`** [Context](Context.md), [rename](Module.md#rename)

#### Returns

`string`

The name.

#### Defined in

[packages/nodegraph-logic/src/lib/api/Module.ts:27](https://github.com/TheDudeFromCI/Quiver/blob/1737dba/packages/nodegraph-logic/src/lib/api/Module.ts#L27)

___

### rename

▸ **rename**(`name`): `Result`<`void`, [`IdentifierError`](../classes/IdentifierError.md)\>

Renames this module to another name.

**`see`** [name](Module.md#name)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

`Result`<`void`, [`IdentifierError`](../classes/IdentifierError.md)\>

An [IdentifierError](../classes/IdentifierError.md) if there is already a module in the
         context this module is in with the given name.

#### Defined in

[packages/nodegraph-logic/src/lib/api/Module.ts:55](https://github.com/TheDudeFromCI/Quiver/blob/1737dba/packages/nodegraph-logic/src/lib/api/Module.ts#L55)
