import { mat4 } from 'gl-matrix'
import { Camera } from './Camera'
import { Material } from './Material'
import { Mesh } from './Mesh'

export class Model {
  private readonly modelMatrix: mat4 = mat4.create()
  private readonly material: Material
  private readonly mesh: Mesh

  constructor (material: Material, mesh: Mesh) {
    this.material = material
    this.mesh = mesh
  }

  update (): void {
    // Pass
  }

  render (camera: Camera): void {
    this.material.bind(camera, this.modelMatrix)
    this.mesh.linkToShader(this.material.shader)
    this.mesh.render()
  }
}
