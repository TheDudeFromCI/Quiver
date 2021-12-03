import { VertexAttribute } from './Mesh'

export type MeshData = [attributes: VertexAttribute[], indices: number[]]

export function createQuad (): MeshData {
  const attributes = [
    new VertexAttribute('a_pos', [0, 1, 0, 0, 1, 0, 1, 1], 2)
  ]

  const indices = [3, 2, 1, 3, 1, 0]
  return [attributes, indices]
}
