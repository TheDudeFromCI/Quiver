import { mat4 } from 'gl-matrix'
import { RenderingEngine } from '../RenderEngine'
import { Shader } from '../Shader'
import { WebGLError } from './WebGLRenderingEngine'

export class GLShader extends Shader {
  private readonly uniforms: Record<string, WebGLUniformLocation | null> = {}
  private readonly attributes: Record<string, number> = {}
  private readonly gl: WebGL2RenderingContext
  private readonly program: WebGLProgram

  constructor (engine: RenderingEngine, name: string, vertexShader: string, fragmentShader: string, gl: WebGL2RenderingContext) {
    super(engine, name, vertexShader, fragmentShader)

    this.gl = gl
    this.program = this.compileProgram()
  }

  private compileProgram (): WebGLProgram {
    const program = this.gl.createProgram()
    if (program == null) throw new WebGLError('Failed to create shader program!')

    this.gl.attachShader(program, this.compileShader(this.gl.VERTEX_SHADER, this.vertexShader))
    this.gl.attachShader(program, this.compileShader(this.gl.FRAGMENT_SHADER, this.fragmentShader))

    this.gl.linkProgram(program)
    if (this.gl.getProgramParameter(program, this.gl.LINK_STATUS) === false) throw new WebGLError(`Failed to link shader program! Error: ${this.gl.getProgramInfoLog(program) ?? ''}`)

    return program
  }

  private compileShader (type: number, source: string): WebGLShader {
    const shader = this.gl.createShader(type)
    if (shader == null) throw new WebGLError('Failed to create shader!')

    this.gl.shaderSource(shader, source)
    this.gl.compileShader(shader)

    if (this.gl.getShaderParameter(shader, this.gl.COMPILE_STATUS) === false) throw new WebGLError(`Failed to compile shader! Error: ${this.gl.getShaderInfoLog(shader) ?? ''}`)

    return shader
  }

  getUniformLocation (name: string): WebGLUniformLocation | null {
    if (this.disposed) throw new WebGLError('Shader already disposed!')
    if (this.uniforms[name] !== undefined) return this.uniforms[name]

    const location = this.gl.getUniformLocation(this.program, name)
    this.uniforms[name] = location
    return location
  }

  getAttributeLocation (name: string): number {
    if (this.disposed) throw new WebGLError('Shader already disposed!')
    if (this.attributes[name] !== undefined) return this.attributes[name]

    const location = this.gl.getAttribLocation(this.program, name)
    this.attributes[name] = location
    return location
  }

  protected bindInner (): void {
    this.gl.useProgram(this.program)
  }

  protected setMatrixInner (name: string, data: mat4): void {
    let oldProgram: WebGLProgram | null = null

    if (!this.isBound) {
      oldProgram = this.gl.getParameter(this.gl.CURRENT_PROGRAM) as WebGLProgram | null
      this.gl.useProgram(this.program)
    }

    const location = this.getUniformLocation(name)
    this.gl.uniformMatrix4fv(location, false, data)

    if (!this.isBound) this.gl.useProgram(oldProgram)
  }

  protected disposeInner (): void {
    if (this.isBound) this.gl.useProgram(null)
    this.gl.deleteProgram(this.program)
  }
}
