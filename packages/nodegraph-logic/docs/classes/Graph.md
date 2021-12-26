[nodegraph-logic](../README.md) / [Exports](../modules.md) / Graph

# Class: Graph

A container for a set of function nodes to show relationships.

**`remarks`**

A Graph, or NodeGraph, is a type of diagram that shows the relationship
of multiple function instances to display how information should be
transformed as it is passed through the graph. Each graph can be thought of
as a function in itself that takes in a set of input data types, or constant
data types, and transforms them in order to produce an output data type. The
inputs, constants, and outputs are usually also represented as nodes within
this graph.

A graph may not contain circular depdencies between nodes.

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

• `Private` `Readonly` **nodes**: [`Node`](../interfaces/Node.md)[] = `[]`

#### Defined in

[packages/nodegraph-logic/src/lib/Graph.ts:24](https://github.com/TheDudeFromCI/Quiver/blob/22115ed/packages/nodegraph-logic/src/lib/Graph.ts#L24)

## Methods

### addNode

▸ **addNode**(`name`, `x`, `y`): `Result`<[`Node`](../interfaces/Node.md), [`IdentifierError`](IdentifierError.md)\>

Creates a new node within this graph.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of this node. |
| `x` | `number` | The x position of this node in world units. |
| `y` | `number` | The y position of this node in world units. |

#### Returns

`Result`<[`Node`](../interfaces/Node.md), [`IdentifierError`](IdentifierError.md)\>

The newly created node, or an [IdentifierError](IdentifierError.md) if there is
         already a node with the given name.

#### Defined in

[packages/nodegraph-logic/src/lib/Graph.ts:36](https://github.com/TheDudeFromCI/Quiver/blob/22115ed/packages/nodegraph-logic/src/lib/Graph.ts#L36)

___

### findNode

▸ **findNode**(`name`): `Option`<[`Node`](../interfaces/Node.md)\>

Finds a node in this graph with the given name.

**`remarks`**

This function is case sensitive.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `name` | `string` | The name of the node to find. |

#### Returns

`Option`<[`Node`](../interfaces/Node.md)\>

The node with the given name, or null if there is no node with
         that name.

#### Defined in

[packages/nodegraph-logic/src/lib/Graph.ts:60](https://github.com/TheDudeFromCI/Quiver/blob/22115ed/packages/nodegraph-logic/src/lib/Graph.ts#L60)
