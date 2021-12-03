import { Mesh, VertexAttribute } from './Mesh'
import { Shader } from './Shader'

export abstract class RenderingEngine {
  protected dirty: boolean = false

  markDirty (): void {
    if (this.dirty) return

    this.dirty = true
    requestAnimationFrame(() => this.render())
  }

  render (): void {
    if (!this.dirty) return
    this.dirty = false
    this.drawScene()
  }

  abstract compileShader (name: string, vertexShader: string, fragmentShader: string): Shader
  abstract compileMesh (name: string, attributes: VertexAttribute[], indices: number[]): Mesh
  protected abstract drawScene (): void
}
