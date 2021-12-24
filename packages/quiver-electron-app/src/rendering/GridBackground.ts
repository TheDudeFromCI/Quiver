import { PlaneGeometry, ShaderMaterial, Mesh, Vector2 } from 'three'

const VERTEX_SHADER = /* glsl */`
varying vec2 pass_uv;
uniform vec2 uni_camPos;
uniform vec2 uni_screenSize;

void main() {
  pass_uv = uv * uni_screenSize / 50.0 + uni_camPos;
  gl_Position = vec4(position.xy, 1.0, 1.0);
}
`

const FRAGMENT_SHADER = /* glsl */`
varying vec2 pass_uv;
uniform vec2 uni_screenSize;

vec4 getColorAt(vec2 uv) {
  vec4 col1 = vec4(0.45, 0.45, 0.45, 1.0);
  vec4 col2 = vec4(0.05, 0.05, 0.05, 1.0);

  vec2 f = fract(uv * 0.25);
  vec2 largeGrid = smoothstep(0.0, 0.01, f) -
                   smoothstep(1.0 - 0.01, 1.0, f);

  f = fract(uv);
  vec2 smallGrid = saturate(
                    smoothstep(0.0, 0.06, f) -
                    smoothstep(1.0 - 0.06, 1.0, f)
                    + 0.75);

  vec2 mult = largeGrid * smallGrid;
  return mix(col1, col2, mult.x * mult.y);
}

void main() {
  vec4 col = vec4(0.0);
  vec3 unit = vec3(0.5 / uni_screenSize, 0.0);

  col += getColorAt(pass_uv);
  col += getColorAt(pass_uv + unit.xz);
  col += getColorAt(pass_uv + unit.zy);
  col += getColorAt(pass_uv + unit.xy);
  gl_FragColor = col * 0.25;
}
`

export default class GridBackground extends Mesh {
  constructor () {
    const planeGeo = new PlaneGeometry(2, 2)
    const material = new ShaderMaterial({
      uniforms: {
        uni_screenSize: {
          value: new Vector2(1, 1)
        },
        uni_camPos: {
          value: new Vector2(0, 0)
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
    mat.uniforms.uni_screenSize.value.x = width
    mat.uniforms.uni_screenSize.value.y = height
  }

  setCameraPos (x: number, y: number): void {
    const mat = this.material as ShaderMaterial
    mat.uniforms.uni_camPos.value.x = x
    mat.uniforms.uni_camPos.value.y = y
    this.position.set(x, y, 0)
  }
}
