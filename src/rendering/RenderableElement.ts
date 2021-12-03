import { RenderingEngine } from './RenderEngine'

export abstract class RenderableElement {
  private readonly engine: RenderingEngine

  constructor (engine: RenderingEngine) {
    this.engine = engine
  }

  markDirty (): void {
    this.engine?.markDirty()
  }
}
