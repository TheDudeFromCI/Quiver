import { Color } from './Color'
import { Model } from './Model'

export abstract class Scene {
  private readonly models: Model[] = []
  public readonly clearColor: Color

  constructor () {
    this.clearColor = new Color(0, 0, 0, 1)
  }

  render (): void {
    this.clearScreen()
    for (const model of this.models) model.render()
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
