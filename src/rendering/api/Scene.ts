import { Camera } from './Camera'
import { Color } from './Color'
import { Model } from './Model'

export abstract class Scene {
  public readonly clearColor: Color = new Color(0, 0, 0, 1)
  public readonly camera: Camera = new Camera()
  private readonly models: Model[] = []

  update (): void {
    for (const model of this.models) model.update()
  }

  render (): void {
    this.clearScreen()
    for (const model of this.models) model.render(this.camera)
  }

  addModel (model: Model): void {
    if (this.models.includes(model)) return
    this.models.push(model)
  }

  removeModel (model: Model): void {
    if (!this.models.includes(model)) return
    this.models.splice(this.models.indexOf(model), 1)
  }

  protected abstract clearScreen (): void
}
