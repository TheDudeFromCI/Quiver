import { RenderingEngine } from '../RenderEngine'
import { Scene } from '../Scene'

export class GLScene extends Scene {
  private readonly gl: WebGL2RenderingContext

  constructor (engine: RenderingEngine, gl: WebGL2RenderingContext) {
    super(engine)
    this.gl = gl
  }

  protected clearScreen (): void {
    this.gl.canvas.width = this.gl.canvas.clientWidth
    this.gl.canvas.height = this.gl.canvas.clientHeight
    this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height)
    this.gl.clearColor(this.clearColor.r, this.clearColor.g, this.clearColor.b, this.clearColor.a)
    this.gl.clear(this.gl.COLOR_BUFFER_BIT)
  }
}
