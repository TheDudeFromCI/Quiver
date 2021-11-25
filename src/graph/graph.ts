import { Background } from './background'
import { Camera, CameraControls } from './camera'
import { ContextMenu } from './contextmenu'
import { InputHandler } from './inputhandler'
import { NodeHandler } from './nodehandler'
import { NodeSelection } from './nodeselection'
import { PlugSelection } from './plugselection'

export class Graph {
  public readonly camera: Camera
  public readonly inputHandler: InputHandler
  public readonly cameraControls: CameraControls
  public readonly background: Background
  public readonly nodeHandler: NodeHandler
  public readonly plugSelection: PlugSelection
  public readonly nodeSelection: NodeSelection
  public readonly contextMenu: ContextMenu

  constructor (canvas: HTMLCanvasElement) {
    this.camera = new Camera(canvas)
    this.inputHandler = new InputHandler(this.camera)
    this.cameraControls = new CameraControls(this.camera, this.inputHandler)
    this.background = new Background(this.camera)
    this.nodeHandler = new NodeHandler(this.camera)
    this.plugSelection = new PlugSelection(this.camera, this.nodeHandler, this.inputHandler)
    this.nodeSelection = new NodeSelection(this.inputHandler, this.nodeHandler)
    this.contextMenu = new ContextMenu(this.camera, this.inputHandler)
  }

  update (delta: number): void {
    this.camera.update(delta)
  }

  render (): void {
    if (!this.needsRepaint()) return

    this.background.render()
    this.nodeHandler.render()
    this.plugSelection.render()
    this.nodeSelection.render(this.camera.ctx)
    this.contextMenu.render()
  }

  private needsRepaint (): boolean {
    let needsRepaint = false
    needsRepaint ||= this.camera.needsRepaint
    needsRepaint ||= this.background.needsRepaint
    needsRepaint ||= this.nodeHandler.needsRepaint
    needsRepaint ||= this.plugSelection.needsRepaint
    needsRepaint ||= this.nodeSelection.needsRepaint
    needsRepaint ||= this.contextMenu.needsRepaint
    return needsRepaint
  }
}
