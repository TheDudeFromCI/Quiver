import { Mesh, VertexAttribute } from './Mesh'
import { Scene } from './Scene'
import { Shader } from './Shader'

export abstract class RenderingEngine {
  private readonly renderLoopTimer: NodeJS.Timer
  private _scene?: Scene
  private dirty: boolean = false
  private _disposed = false

  constructor () {
    const renderLoop = (): void => {
      this.update()
      this.render()
    }

    this.renderLoopTimer = setInterval(renderLoop, 16)
  }

  get scene (): Scene {
    if (this.disposed) throw new Error('Render engine already disposed!')
    if (this._scene == null) this._scene = this.createScene()
    return this._scene
  }

  get disposed (): boolean {
    return this._disposed
  }

  markDirty (): void {
    if (this.disposed) throw new Error('Render engine already disposed!')
    if (this.dirty) return

    this.dirty = true
    requestAnimationFrame(() => this.render())
  }

  update (): void {
    if (this.disposed) throw new Error('Render engine already disposed!')
    this.scene.update()
  }

  render (): void {
    if (this.disposed) throw new Error('Render engine already disposed!')
    if (!this.dirty) return
    this.dirty = false
    this.scene.render()
  }

  dispose (): void {
    if (this._disposed) return
    this._disposed = true

    delete this._scene
    Shader.disposeAll()
    Mesh.disposeAll()
    clearInterval(this.renderLoopTimer)
  }

  abstract compileShader (name: string, vertexShader: string, fragmentShader: string): Shader
  abstract compileMesh (name: string, attributes: VertexAttribute[], indices: number[]): Mesh
  abstract createScene (): Scene
}
