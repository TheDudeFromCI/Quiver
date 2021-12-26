[nodegraph-logic](../README.md) / [Exports](../modules.md) / Node

# Interface: Node

An executable function within a Node Graph.

**`remarks`**

A node has a variable number of staticlly typed inputs and a variable number
of stateically typed outputs. A node represents a pure function that takes in
data and modifies it to produce some output data.

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

▸ **graph**(): [`Graph`](Graph.md)

Gets graph that this node is part of.

#### Returns

[`Graph`](Graph.md)

The graph.

#### Defined in

[packages/nodegraph-logic/src/lib/api/Node.ts:75](https://github.com/TheDudeFromCI/Quiver/blob/1737dba/packages/nodegraph-logic/src/lib/api/Node.ts#L75)

___

### height

▸ **height**(): `number`

Gets the height of the node in world units.

**`see`** [width](Node.md#width)

#### Returns

`number`

The height.

#### Defined in

[packages/nodegraph-logic/src/lib/api/Node.ts:55](https://github.com/TheDudeFromCI/Quiver/blob/1737dba/packages/nodegraph-logic/src/lib/api/Node.ts#L55)

___

### moveTo

▸ **moveTo**(`x`, `y`): `void`

Moves this node to a new loction in the graph.

**`oaram`** x - The new x location in world units.

**`oaram`** y - The new y location in world units.

**`see`** [x](Node.md#x), [y](Node.md#y)

#### Parameters

| Name | Type |
| :------ | :------ |
| `x` | `number` |
| `y` | `number` |

#### Returns

`void`

#### Defined in

[packages/nodegraph-logic/src/lib/api/Node.ts:96](https://github.com/TheDudeFromCI/Quiver/blob/1737dba/packages/nodegraph-logic/src/lib/api/Node.ts#L96)

___

### name

▸ **name**(): `string`

Gets the name of this node.

**`remarks`**
This is used as the unquie identifier of the node within a graph. No two
nodes within a graph may have the same name. The only exception to this
rule is nodes within nested functions, which are considered to be part
of a seperate graph.

#### Returns

`string`

The name.

#### Defined in

[packages/nodegraph-logic/src/lib/api/Node.ts:68](https://github.com/TheDudeFromCI/Quiver/blob/1737dba/packages/nodegraph-logic/src/lib/api/Node.ts#L68)

___

### rename

▸ **rename**(`name`): `Result`<`void`, [`IdentifierError`](../classes/IdentifierError.md)\>

Renames this node to a new identifier.

**`see`** [name](Node.md#name)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The new name for this node. |

#### Returns

`Result`<`void`, [`IdentifierError`](../classes/IdentifierError.md)\>

An [IdentifierError](../classes/IdentifierError.md) if there is already an existing node in
         graph this this name.

#### Defined in

[packages/nodegraph-logic/src/lib/api/Node.ts:86](https://github.com/TheDudeFromCI/Quiver/blob/1737dba/packages/nodegraph-logic/src/lib/api/Node.ts#L86)

___

### setSize

▸ **setSize**(`width`, `height`): `Result`<`void`, [`InvalidArgumentError`](../classes/InvalidArgumentError.md)\>

Sets this node to a new size.

**`see`** [width](Node.md#width), [height](Node.md#height)

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `width` | `number` | The new width in world units. |
| `height` | `number` | The new height in world units. |

#### Returns

`Result`<`void`, [`InvalidArgumentError`](../classes/InvalidArgumentError.md)\>

An [InvalidArgumentError](../classes/InvalidArgumentError.md) if the width or height is < 1
         world unit.

#### Defined in

[packages/nodegraph-logic/src/lib/api/Node.ts:108](https://github.com/TheDudeFromCI/Quiver/blob/1737dba/packages/nodegraph-logic/src/lib/api/Node.ts#L108)

___

### width

▸ **width**(): `number`

Gets the width of the node in world units.

**`see`** [height](Node.md#height)

#### Returns

`number`

The width.

#### Defined in

[packages/nodegraph-logic/src/lib/api/Node.ts:47](https://github.com/TheDudeFromCI/Quiver/blob/1737dba/packages/nodegraph-logic/src/lib/api/Node.ts#L47)

___

### x

▸ **x**(): `number`

Gets the x location of the node in world units.

**`remarks`**

The x, y location of a node indicates it's bottom left corner.

**`see`** [y](Node.md#y)

#### Returns

`number`

The x location.

#### Defined in

[packages/nodegraph-logic/src/lib/api/Node.ts:27](https://github.com/TheDudeFromCI/Quiver/blob/1737dba/packages/nodegraph-logic/src/lib/api/Node.ts#L27)

___

### y

▸ **y**(): `number`

Gets the y location of the node in world units.

**`remarks`**

The x, y location of a node indicates it's bottom left corner.

**`see`** [x](Node.md#x)

#### Returns

`number`

The y location.

#### Defined in

[packages/nodegraph-logic/src/lib/api/Node.ts:39](https://github.com/TheDudeFromCI/Quiver/blob/1737dba/packages/nodegraph-logic/src/lib/api/Node.ts#L39)
