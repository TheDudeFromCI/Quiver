import { Material } from './Material'
import { Mesh } from './Mesh'

export class Model {
  private readonly material: Material
  private readonly mesh: Mesh

  constructor (material: Material, mesh: Mesh) {
    this.material = material
    this.mesh = mesh
  }

  render (): void {
    this.material.bind()
    this.mesh.linkToShader(this.material.shader)
    this.mesh.render()
  }
}
