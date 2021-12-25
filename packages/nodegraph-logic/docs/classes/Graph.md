[nodegraph-logic](../README.md) / [Exports](../modules.md) / Graph

# Class: Graph

## Table of contents

### Constructors

- [constructor](Graph.md#constructor)

### Properties

- [nodes](Graph.md#nodes)

### Methods

- [addNode](Graph.md#addnode)
- [findNode](Graph.md#findnode)

## Constructors

### constructor

• **new Graph**()

## Properties

### nodes

• `Private` `Readonly` **nodes**: `NodeImpl`[] = `[]`

#### Defined in

[packages/nodegraph-logic/src/lib/Graph.ts:5](https://github.com/TheDudeFromCI/Quiver/blob/8f9fde9/packages/nodegraph-logic/src/lib/Graph.ts#L5)

## Methods

### addNode

▸ **addNode**(`name`, `x`, `y`): [`Node`](../interfaces/Node.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |
| `x` | `number` |
| `y` | `number` |

#### Returns

[`Node`](../interfaces/Node.md)

#### Defined in

[packages/nodegraph-logic/src/lib/Graph.ts:7](https://github.com/TheDudeFromCI/Quiver/blob/8f9fde9/packages/nodegraph-logic/src/lib/Graph.ts#L7)

___

### findNode

▸ **findNode**(`name`): ``null`` \| [`Node`](../interfaces/Node.md)

#### Parameters

| Name | Type |
| :------ | :------ |
| `name` | `string` |

#### Returns

``null`` \| [`Node`](../interfaces/Node.md)

#### Defined in

[packages/nodegraph-logic/src/lib/Graph.ts:15](https://github.com/TheDudeFromCI/Quiver/blob/8f9fde9/packages/nodegraph-logic/src/lib/Graph.ts#L15)
