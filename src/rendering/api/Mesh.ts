import { RenderableElement } from './RenderableElement'
import { RenderingEngine } from './RenderEngine'
import { Shader } from './Shader'

export class VertexAttribute {
  public readonly name: string
  public readonly data: Float32Array
  public readonly size: number

  constructor (name: string, data: number[], size: number) {
    this.name = name
    this.data = new Float32Array(data)
    this.size = size
  }
}

export abstract class Mesh extends RenderableElement {
  private static activeMeshes: Record<string, Mesh> = {}

  public static find (name: string): Mesh {
    return Mesh.activeMeshes[name]
  }

  public static disposeAll (): void {
    for (const mesh in Mesh.activeMeshes) Mesh.activeMeshes[mesh].dispose()
  }

  public readonly name: string
  public readonly attributes: Readonly<VertexAttribute[]>
  public readonly indices: Int16Array
  public readonly triangleCount: number
  private _disposed: boolean = false
  private targetShader: string | null = null

  constructor (engine: RenderingEngine, name: string, attributes: VertexAttribute[], indices: number[]) {
    super(engine)
    if (Mesh.activeMeshes[name] !== undefined) throw new MeshError('There is already a mesh with the given name!')

    this.name = name
    this.attributes = attributes
    this.indices = new Int16Array(indices)
    this.triangleCount = indices.length / 3

    Mesh.activeMeshes[name] = this
  }

  get disposed (): boolean {
    return this._disposed
  }

  dispose (): void {
    if (this.disposed) return
    this._disposed = true

    const activeMeshes: Record<string, Mesh> = {}
    for (const mesh in Mesh.activeMeshes) {
      if (mesh === this.name) continue
      activeMeshes[mesh] = Mesh.activeMeshes[mesh]
    }
    Mesh.activeMeshes = activeMeshes

    this.disposeInner()
  }

  render (): void {
    if (this.disposed) throw new MeshError('Mesh already disposed!')
    this.renderInner()
  }

  linkToShader (shader: Shader): void {
    if (this.disposed) throw new MeshError('Mesh already disposed!')

    if (this.targetShader === shader.name) return
    this.targetShader = shader.name

    this.linkToShaderInner(shader)
  }

  protected abstract renderInner (): void
  protected abstract disposeInner (): void
  protected abstract linkToShaderInner (shader: Shader): void
}

export class MeshError extends Error {

}
