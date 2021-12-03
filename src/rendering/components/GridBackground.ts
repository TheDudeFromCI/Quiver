import { Material } from '../api/Material'
import { createQuad } from '../utils/MeshPrimatives'
import { Model } from '../api/Model'
import { RenderingEngine } from '../api/RenderEngine'

const VERTEX_SHADER = `#version 300 es
precision highp float;

in vec2 a_pos;

uniform mat4 projectionMatrix;
uniform mat4 viewMatrix;
uniform mat4 modelMatrix;

void main() {
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(a_pos, 0.0, 1.0);
}
`

const FRAGMENT_SHADER = `#version 300 es
precision highp float;

out vec4 fragColor;

void main() {
  fragColor = vec4(1.0, 0.07, 0.07, 1.0);
}
`

export class GridBackground extends Model {
  constructor (engine: RenderingEngine) {
    const shader = engine.compileShader('background/grid', VERTEX_SHADER, FRAGMENT_SHADER)
    const material = new Material(shader)
    const [attributes, indices] = createQuad()
    const mesh = engine.compileMesh('gridBackground_Quad', attributes, indices)
    super(material, mesh)
  }
}
