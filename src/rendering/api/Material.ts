import { mat4 } from 'gl-matrix'
import { Camera } from './Camera'
import { Shader } from './Shader'

export class Material {
  public readonly shader: Shader

  constructor (shader: Shader) {
    this.shader = shader
  }

  bind (camera: Camera, modelMatrix: mat4): void {
    this.shader.bind()
    this.shader.setMatrix('projectionMatrix', camera.projectionMatrix)
    this.shader.setMatrix('viewMatrix', camera.viewMatrix)
    this.shader.setMatrix('modelMatrix', modelMatrix)
  }
}
