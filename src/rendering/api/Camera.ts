import { mat4, quat, vec3 } from 'gl-matrix'

export class Camera {
  public readonly projectionMatrix: mat4 = mat4.create()
  public readonly viewMatrix: mat4 = mat4.create()
  private readonly rotation: quat = quat.create()
  private readonly position: vec3 = vec3.create()
  private readonly scale: vec3 = vec3.set(vec3.create(), 1, 1, 1)
  private _canvasWidth: number = 1
  private _canvasHeight: number = 1

  constructor () {
    this.updateProjection()
  }

  get canvasWidth (): number {
    return this._canvasWidth
  }

  get canvasHeight (): number {
    return this._canvasHeight
  }

  get x (): number {
    return this.position[0]
  }

  set x (value: number) {
    if (this.x === value) return
    this.position[0] = value
    this.updateView()
  }

  get y (): number {
    return this.position[1]
  }

  set y (value: number) {
    if (this.y === value) return
    this.position[1] = value
    this.updateView()
  }

  get zoom (): number {
    return this.scale[0]
  }

  set zoom (value: number) {
    if (this.zoom === value) return
    vec3.set(this.scale, value, value, value)
    this.updateView()
  }

  setCanvasSize (width: number, height: number): void {
    if (this._canvasWidth === width && this._canvasHeight === height) return
    this._canvasWidth = width
    this._canvasHeight = height
    this.updateProjection()
  }

  private updateProjection (): void {
    mat4.ortho(this.projectionMatrix, 0, this.canvasWidth, this.canvasHeight, 0, -1, 1)
  }

  private updateView (): void {
    mat4.fromRotationTranslationScale(this.viewMatrix, this.rotation, this.position, this.scale)
  }
}
