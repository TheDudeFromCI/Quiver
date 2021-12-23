import { PlaneGeometry, ShaderMaterial, Mesh, Vector4 } from 'three'

const VERTEX_SHADER = `
varying vec2 pass_uv;

void main() {
  pass_uv = uv;
  gl_Position = vec4(position.xyz, 1.0);
}
`

const FRAGMENT_SHADER = `
varying vec2 pass_uv;

uniform vec4 uni_gridSize;

void main() {
  vec4 col1 = vec4(0.45, 0.45, 0.45, 1.0);
  vec4 col2 = vec4(0.05, 0.05, 0.05, 1.0);

  vec2 cell = pass_uv * uni_gridSize.zw / uni_gridSize.xx;
  vec2 f = fract(cell);

  vec2 largeGrid = smoothstep(0.0, uni_gridSize.y * 0.66, f) -
                   smoothstep(1.0 - uni_gridSize.y * 0.66, 1.0, f);

  vec2 smallGrid = saturate(step(uni_gridSize.y, fract(cell * 4.0)) + 0.75);

  vec2 mult = largeGrid * smallGrid;
  gl_FragColor = mix(col1, col2, mult.x * mult.y);
}
`

export default class GridBackground extends Mesh {
  constructor () {
    const planeGeo = new PlaneGeometry(2, 2)
    const material = new ShaderMaterial({
      uniforms: {
        uni_gridSize: {
          value: new Vector4(200, 0.015, 1, 1)
        }
      },
      vertexShader: VERTEX_SHADER,
      fragmentShader: FRAGMENT_SHADER,
      depthWrite: false,
      depthTest: false
    })

    super(planeGeo, material)
  }

  setScreenSize (width: number, height: number): void {
    const mat = this.material as ShaderMaterial
    mat.uniforms.uni_gridSize.value.z = width
    mat.uniforms.uni_gridSize.value.w = height
  }

  setCellSize (cellSize: number): void {
    const mat = this.material as ShaderMaterial
    mat.uniforms.uni_gridSize.value.x = cellSize
  }

  setLineWidth (lineWidth: number): void {
    const mat = this.material as ShaderMaterial
    mat.uniforms.uni_gridSize.value.y = lineWidth
  }
}
