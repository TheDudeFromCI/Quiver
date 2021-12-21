import { Scene, OrthographicCamera, WebGLRenderer, Object3D } from 'three'
import GridBackground from '../components/GridBackground'

export class Graph {
  private readonly canvas: HTMLCanvasElement
  private readonly scene: Scene
  private readonly camera: OrthographicCamera
  private readonly renderer: WebGLRenderer
  private readonly background: GridBackground

  constructor (canvas: HTMLCanvasElement) {
    this.scene = new Scene()
    this.canvas = canvas
    this.camera = new OrthographicCamera(-1, 1, 1, -1, 0, 1)
    this.renderer = new WebGLRenderer({ canvas: this.canvas, antialias: true })
    this.background = new GridBackground()
    this.addComponent(this.background)

    this.updateCanvasSize()
  }

  private updateCanvasSize (): void {
    this.canvas.width = this.canvas.clientWidth
    this.canvas.height = this.canvas.clientHeight
    this.camera.right = this.canvas.clientWidth
    this.camera.top = this.canvas.clientHeight
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
    this.renderer.render(this.scene, this.camera)
  }
}
