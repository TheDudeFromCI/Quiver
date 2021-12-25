[nodegraph-logic](../README.md) / [Exports](../modules.md) / Node

# Interface: Node

An executable function within a Node Graph.

**`remarks`**

A node has a variable number of
staticlly typed inputs and a variable number of stateically typed outputs.
A node represents a pure function that takes in data and modifies it to
produce some output data.

## Table of contents

### Methods

- [graph](Node.md#graph)
- [height](Node.md#height)
- [moveTo](Node.md#moveto)
- [name](Node.md#name)
- [rename](Node.md#rename)
- [setSize](Node.md#setsize)
- [width](Node.md#width)
- [x](Node.md#x)
- [y](Node.md#y)

## Methods

### graph

▸ **graph**(): [`Graph`](../classes/Graph.md)

#### Returns

[`Graph`](../classes/Graph.md)

The graph that this node is part of.

#### Defined in

[packages/nodegraph-logic/src/lib/api/Node.ts:43](https://github.com/TheDudeFromCI/Quiver/blob/8f9fde9/packages/nodegraph-logic/src/lib/api/Node.ts#L43)

___

### height

▸ **height**(): `number`

#### Returns

`number`

The height of the node in world units.

#### Defined in

[packages/nodegraph-logic/src/lib/api/Node.ts:32](https://github.com/TheDudeFromCI/Quiver/blob/8f9fde9/packages/nodegraph-logic/src/lib/api/Node.ts#L32)

___

### moveTo

▸ **moveTo**(`x`, `y`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Returns

`void`

#### Defined in

[packages/nodegraph-logic/src/lib/api/Node.ts:53](https://github.com/TheDudeFromCI/Quiver/blob/8f9fde9/packages/nodegraph-logic/src/lib/api/Node.ts#L53)

___

### name

▸ **name**(): `string`

#### Returns

`string`

The name of this node. This is used as the unquie identifier of the
node within a graph.

#### Defined in

[packages/nodegraph-logic/src/lib/api/Node.ts:38](https://github.com/TheDudeFromCI/Quiver/blob/8f9fde9/packages/nodegraph-logic/src/lib/api/Node.ts#L38)

___

### rename

▸ **rename**(`name`): `void`

Renames this node to a new identifier.

**`throws`** {@link nodegraph-logic#IdentifierError} If there is already an existing node in
graph this this name.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The new name for this node. |

#### Returns

`void`

#### Defined in

[packages/nodegraph-logic/src/lib/api/Node.ts:51](https://github.com/TheDudeFromCI/Quiver/blob/8f9fde9/packages/nodegraph-logic/src/lib/api/Node.ts#L51)

___

### setSize

▸ **setSize**(`width`, `height`): `void`

#### Parameters

| Name | Type |
| :------ | :------ |
| `width` | `number` |
| `height` | `number` |

#### Returns

`void`

#### Defined in

[packages/nodegraph-logic/src/lib/api/Node.ts:55](https://github.com/TheDudeFromCI/Quiver/blob/8f9fde9/packages/nodegraph-logic/src/lib/api/Node.ts#L55)

___

### width

▸ **width**(): `number`

#### Returns

`number`

The width of the node in world units.

#### Defined in

[packages/nodegraph-logic/src/lib/api/Node.ts:27](https://github.com/TheDudeFromCI/Quiver/blob/8f9fde9/packages/nodegraph-logic/src/lib/api/Node.ts#L27)

___

### x

▸ **x**(): `number`

#### Returns

`number`

The x location of the node in world units.

#### Defined in

[packages/nodegraph-logic/src/lib/api/Node.ts:17](https://github.com/TheDudeFromCI/Quiver/blob/8f9fde9/packages/nodegraph-logic/src/lib/api/Node.ts#L17)

___

### y

▸ **y**(): `number`

#### Returns

`number`

The y location of the node in world units.

#### Defined in

[packages/nodegraph-logic/src/lib/api/Node.ts:22](https://github.com/TheDudeFromCI/Quiver/blob/8f9fde9/packages/nodegraph-logic/src/lib/api/Node.ts#L22)
