import { RenderableElement } from './RenderableElement'
import { RenderingEngine } from './RenderEngine'

export class Color extends RenderableElement {
  private _r: number
  private _g: number
  private _b: number
  private _a: number

  get r (): number {
    return this._r
  }

  set r (value: number) {
    this._r = value
    this.markDirty()
  }

  get g (): number {
    return this._g
  }

  set g (value: number) {
    this._g = value
    this.markDirty()
  }

  get b (): number {
    return this._b
  }

  set b (value: number) {
    this._b = value
    this.markDirty()
  }

  get a (): number {
    return this._a
  }

  set a (value: number) {
    this._a = value
    this.markDirty()
  }

  constructor (engine: RenderingEngine, r: number, g: number, b: number, a: number = 1) {
    super(engine)

    this._r = r
    this._g = g
    this._b = b
    this._a = a
  }
}
