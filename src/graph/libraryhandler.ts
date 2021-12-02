export class DataType {
  public readonly name: string
  public readonly description: string
  public readonly parents: DataType[]

  constructor (name: string, description: string, parents: DataType[]) {
    this.name = name
    this.description = description
    this.parents = parents
  }
}

export class PlugType {
  public readonly name: string
  public readonly type: DataType

  constructor (name: string, type: DataType) {
    this.name = name
    this.type = type
  }
}

export class NodeType {
  public readonly name: string
  public readonly namespace: string
  public readonly description: string
  public readonly inputs: Readonly<PlugType[]>
  public readonly outputs: Readonly<PlugType[]>

  constructor (name: string, namespace: string, description: string, inputs: PlugType[], outputs: PlugType[]) {
    this.name = name
    this.namespace = namespace
    this.description = description
    this.inputs = inputs
    this.outputs = outputs
  }
}

export class Library {
  public readonly nodeTypes: Readonly<NodeType[]>
  public readonly dataTypes: Readonly<DataType[]>

  private constructor (nodeTypes: NodeType[], dataTypes: DataType[]) {
    this.nodeTypes = nodeTypes
    this.dataTypes = dataTypes
  }

  static load (json: any): Library {
    const nodeTypes: NodeType[] = []
    const dataTypes: DataType[] = []

    const dataTypeList: any[] = json.dataTypes ?? []
    for (const dataType of dataTypeList) {
      const name: string = dataType.name ?? 'Unnamed Data Type'
      const description: string = dataType.description ?? 'No description available.'
      const parents: DataType[] = dataType.parents ?? []
      const type = new DataType(name, description, parents)
      dataTypes.push(type)
    }

    const nodeTypeList: any[] = json.nodes ?? []
    for (const nodeType of nodeTypeList) {
      const name: string = nodeType.name
      if (name == null) throw new LibraryParseError('Node type name not defined!')

      const namespace: string = nodeType.namespace
      if (namespace == null) throw new LibraryParseError('Node type namespace not defined!')

      const description: string = nodeType.description ?? 'No description available.'

      const inputs: PlugType[] = []
      const inputList: any[] = nodeType.inputs ?? []
      for (const input of inputList) {
        const inputName: string = input.name ?? ''
        const inputType: DataType | undefined = dataTypes.find(d => d.name === input.type)
        if (inputType == null) throw new LibraryParseError('Failed to load data type for node input!')
        inputs.push(new PlugType(inputName, inputType))
      }

      const outputs: PlugType[] = []
      const outputList: any[] = nodeType.outputs ?? []
      for (const output of outputList) {
        const outputName: string = output.name ?? ''
        const outputType: DataType | undefined = dataTypes.find(d => d.name === output.type)
        if (outputType == null) throw new LibraryParseError('Failed to load data type for node output!')
        outputs.push(new PlugType(outputName, outputType))
      }

      const type = new NodeType(name, namespace, description, inputs, outputs)
      nodeTypes.push(type)
    }

    return new Library(nodeTypes, dataTypes)
  }
}

export class LibraryParseError extends Error {
}
