import { mat4 } from 'gl-matrix'

export abstract class Shader {
  private static activeShaders: Record<string, Shader> = {}
  private static boundShader: string | null = null

  public static find (name: string): Shader {
    return Shader.activeShaders[name]
  }

  public static disposeAll (): void {
    for (const shader in Shader.activeShaders) Shader.activeShaders[shader].dispose()
  }

  public readonly name: string
  public readonly vertexShader: string
  public readonly fragmentShader: string
  private _disposed: boolean = false

  constructor (name: string, vertexShader: string, fragmentShader: string) {
    if (Shader.activeShaders[name] !== undefined) throw new ShaderError('There is already a shader with the given name!')

    this.name = name
    this.vertexShader = vertexShader
    this.fragmentShader = fragmentShader

    Shader.activeShaders[name] = this
  }

  get disposed (): boolean {
    return this._disposed
  }

  get isBound (): boolean {
    return Shader.boundShader === this.name
  }

  bind (): void {
    if (this.disposed) throw new ShaderError('Shader already disposed!')

    if (Shader.boundShader === this.name) return
    Shader.boundShader = this.name

    this.bindInner()
  }

  dispose (): void {
    if (this._disposed) return
    this._disposed = true

    const activeShaders: Record<string, Shader> = {}
    for (const shader in Shader.activeShaders) {
      if (shader === this.name) continue
      activeShaders[shader] = Shader.activeShaders[shader]
    }
    Shader.activeShaders = activeShaders

    this.disposeInner()
  }

  setMatrix (name: string, data: mat4): void {
    if (this.disposed) throw new ShaderError('Shader already disposed!')
    this.setMatrixInner(name, data)
  }

  protected abstract bindInner (): void
  protected abstract disposeInner (): void
  protected abstract setMatrixInner (name: string, data: mat4): void
}

export class ShaderError extends Error {
}
