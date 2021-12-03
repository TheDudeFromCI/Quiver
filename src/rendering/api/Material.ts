import { mat4 } from 'gl-matrix'
import { Shader } from './Shader'

export class Material {
  public readonly shader: Shader
  public readonly projectionMatrix: mat4
  public readonly viewMatrix: mat4
  public readonly modelMatrix: mat4

  constructor (shader: Shader) {
    this.shader = shader
    this.projectionMatrix = mat4.ortho(mat4.create(), 0, 10, 10, 0, -1, 1)
    this.viewMatrix = mat4.identity(mat4.create())
    this.modelMatrix = mat4.identity(mat4.create())
  }

  bind (): void {
    this.shader.bind()
    this.shader.setMatrix('projectionMatrix', this.projectionMatrix)
    this.shader.setMatrix('viewMatrix', this.viewMatrix)
    this.shader.setMatrix('modelMatrix', this.modelMatrix)
  }
}
