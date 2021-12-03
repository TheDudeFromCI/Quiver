import { Mesh, VertexAttribute } from '../api/Mesh'
import { GLShader } from './GLShader'
import { WebGLError } from './WebGLRenderingEngine'

export class GLMesh extends Mesh {
  private readonly gl: WebGL2RenderingContext
  private readonly buffers: Record<string, WebGLBuffer> = {}
  private readonly vao: WebGLVertexArrayObject

  constructor (name: string, attributes: VertexAttribute[], indices: number[], gl: WebGL2RenderingContext) {
    super(name, attributes, indices)

    this.gl = gl
    this.vao = this.compileVAO()
  }

  private compileVAO (): WebGLVertexArrayObject {
    const vao = this.gl.createVertexArray()
    if (vao == null) throw new WebGLError('Failed to create vertex array object!')
    this.gl.bindVertexArray(vao)

    for (const attribute of this.attributes) {
      const buffer = this.gl.createBuffer()
      if (buffer == null) throw new WebGLError('Failed to create data buffer!')
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer)
      this.gl.bufferData(this.gl.ARRAY_BUFFER, attribute.data, this.gl.STATIC_DRAW)
      this.buffers[attribute.name] = buffer
    }

    const indexBuffer = this.gl.createBuffer()
    if (indexBuffer == null) throw new WebGLError('Failed to create data buffer!')
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, indexBuffer)
    this.gl.bufferData(this.gl.ELEMENT_ARRAY_BUFFER, this.indices, this.gl.STATIC_DRAW)
    this.buffers.indices = indexBuffer

    return vao
  }

  protected linkToShaderInner (shader: GLShader): void {
    for (const attribute of this.attributes) {
      const buffer = this.buffers[attribute.name]
      this.gl.bindBuffer(this.gl.ARRAY_BUFFER, buffer)

      const attLoc = shader.getAttributeLocation(attribute.name)
      this.gl.vertexAttribPointer(attLoc, attribute.size, this.gl.FLOAT, false, 0, 0)
      this.gl.enableVertexAttribArray(attLoc)
    }
  }

  protected renderInner (): void {
    this.gl.bindVertexArray(this.vao)
    this.gl.bindBuffer(this.gl.ELEMENT_ARRAY_BUFFER, this.buffers.indices)
    this.gl.drawElements(this.gl.TRIANGLES, this.indices.length, this.gl.UNSIGNED_SHORT, 0)
  }

  protected disposeInner (): void {
    this.gl.deleteVertexArray(this.vao)
  }
}
