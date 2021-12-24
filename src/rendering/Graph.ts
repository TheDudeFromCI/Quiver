import { Scene, OrthographicCamera, WebGLRenderer, Object3D } from 'three'
import GridBackground from './GridBackground'

export class Graph {
  public static readonly GRID_SIZE = 50

  private readonly canvas: HTMLCanvasElement
  private readonly scene: Scene
  private readonly renderer: WebGLRenderer
  private readonly background: GridBackground

  public readonly camera: OrthographicCamera

  constructor (canvas: HTMLCanvasElement) {
    this.scene = new Scene()
    this.canvas = canvas
    this.camera = new OrthographicCamera(-10, 10, 10, -10, 1, 10)
    this.renderer = new WebGLRenderer({ canvas: this.canvas, depth: false })
    this.background = new GridBackground()
    this.addComponent(this.background)

    this.camera.translateZ(5)
    this.renderer.autoClear = false
    this.updateCanvasSize()
  }

  private updateCanvasSize (): void {
    this.canvas.width = this.canvas.clientWidth
    this.canvas.height = this.canvas.clientHeight
    this.camera.right = this.canvas.width / Graph.GRID_SIZE
    this.camera.top = this.canvas.height / Graph.GRID_SIZE
    this.camera.left = 0
    this.camera.bottom = 0
    this.camera.updateProjectionMatrix()
    this.background.setScreenSize(this.canvas.width, this.canvas.height)
    this.renderer.setViewport(0, 0, this.canvas.width, this.canvas.height)
  }

  addComponent (c: Object3D): void {
    this.scene.add(c)
  }

  update (_delta: number): void {
    if (this.canvas.width !== this.canvas.clientWidth ||
        this.canvas.height !== this.canvas.clientHeight) {
      this.updateCanvasSize()
    }
  }

  render (): void {
    const pos = this.camera.position
    this.background.setCameraPos(pos.x, pos.y)
    this.renderer.render(this.scene, this.camera)
  }
}
