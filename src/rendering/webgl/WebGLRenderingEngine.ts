import { VertexAttribute, Mesh } from '../api/Mesh'
import { RenderingEngine } from '../api/RenderEngine'
import { Shader } from '../api/Shader'
import { GLMesh } from './GLMesh'
import { GLScene } from './GLScene'
import { GLShader } from './GLShader'

export class WebGLRenderingEngine extends RenderingEngine {
  public readonly scene: GLScene
  private readonly gl: WebGL2RenderingContext

  constructor (canvas: HTMLCanvasElement) {
    super()

    const gl = canvas.getContext('webgl2')
    if (gl == null) throw new WebGLError('Failed to initialize WebGL!')
    this.gl = gl

    this.scene = new GLScene(gl)
    this.markDirty()
  }

  protected drawScene (): void {
    this.scene.render()
  }

  compileShader (name: string, vertexShader: string, fragmentShader: string): Shader {
    return new GLShader(name, vertexShader, fragmentShader, this.gl)
  }

  compileMesh (name: string, attributes: VertexAttribute[], indices: number[]): Mesh {
    return new GLMesh(name, attributes, indices, this.gl)
  }
}

export class WebGLError extends Error {
}
