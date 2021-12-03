import { VertexAttribute, Mesh } from '../api/Mesh'
import { RenderingEngine } from '../api/RenderEngine'
import { Scene } from '../api/Scene'
import { Shader } from '../api/Shader'
import { GLMesh } from './GLMesh'
import { GLScene } from './GLScene'
import { GLShader } from './GLShader'

export class WebGLRenderingEngine extends RenderingEngine {
  private readonly gl: WebGL2RenderingContext

  constructor (canvas: HTMLCanvasElement) {
    super()

    const gl = canvas.getContext('webgl2')
    if (gl == null) throw new WebGLError('Failed to initialize WebGL!')
    this.gl = gl

    this.markDirty()
  }

  compileShader (name: string, vertexShader: string, fragmentShader: string): Shader {
    return new GLShader(name, vertexShader, fragmentShader, this.gl)
  }

  compileMesh (name: string, attributes: VertexAttribute[], indices: number[]): Mesh {
    return new GLMesh(name, attributes, indices, this.gl)
  }

  createScene (): Scene {
    return new GLScene(this.gl)
  }
}

export class WebGLError extends Error {
}
