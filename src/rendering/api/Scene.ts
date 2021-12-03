import { Color } from './Color'
import { Model } from './Model'
import { RenderableElement } from './RenderableElement'
import { RenderingEngine } from './RenderEngine'

export abstract class Scene extends RenderableElement {
  private readonly models: Model[] = []
  public readonly clearColor: Color

  constructor (engine: RenderingEngine) {
    super(engine)
    this.clearColor = new Color(engine, 0, 0, 0, 1)
  }

  render (): void {
    this.clearScreen()
    for (const model of this.models) model.render()
  }

  addModel (model: Model): void {
    if (this.models.includes(model)) return
    this.models.push(model)
    this.markDirty()
  }

  removeModel (model: Model): void {
    if (!this.models.includes(model)) return
    this.models.splice(this.models.indexOf(model), 1)
    this.markDirty()
  }

  protected abstract clearScreen (): void
}
