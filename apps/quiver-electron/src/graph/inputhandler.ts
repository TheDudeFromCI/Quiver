import { Camera } from './camera'
import { Position } from './position'

export interface MouseListener {
  mouseDown?: (mouse: MouseInfo) => void
  mouseMoved?: (mouse: MouseInfo) => void
  mouseUp?: (mouse: MouseInfo) => void
  mouseWheel?: (mouse: MouseInfo) => void
  keyDown?: (key: KeyInfo) => void
  keyUp?: (key: KeyInfo) => void
}

export class MouseInfo {
  public readonly pos: Position = new Position()
  public readonly deltaPos: Position = new Position()
  public readonly lastPos: Position = new Position()
  public readonly startPos: Position = new Position()
  public readonly screenPos: Position = new Position()
  public button: number = 0
  public mouseDown: boolean = false
  public wheelDeltaY: number = 0
}

export class KeyInfo {
  public key: string = ''
  public alt: boolean = false
  public control: boolean = false
  public metakey: boolean = false
  public shift: boolean = false
  public heldKeys: string[] = []
}

export class InputHandler {
  private readonly camera: Camera
  private readonly mouseInfo: MouseInfo = new MouseInfo()
  private readonly keyInfo: KeyInfo = new KeyInfo()
  private readonly listeners: MouseListener[] = []

  constructor (camera: Camera) {
    this.camera = camera

    const canvas = this.camera.canvas
    canvas.addEventListener('mousedown', e => this.onMouseDown(e))
    canvas.addEventListener('mousemove', e => this.onMouseMove(e))
    canvas.addEventListener('mouseup', e => this.onMouseUp(e))
    canvas.addEventListener('wheel', e => this.onMouseWheel(e))
    canvas.addEventListener('contextmenu', e => this.onContextMenu(e))
    document.addEventListener('keydown', e => this.onKeyDown(e))
    document.addEventListener('keyup', e => this.onKeyUp(e))
  }

  private onMouseDown (e: MouseEvent): void {
    if (!document.hasFocus()) return
    e.preventDefault()
    this.getMousePos(e)
    this.mouseInfo.startPos.set(this.mouseInfo.pos.x, this.mouseInfo.pos.y)
    this.mouseInfo.lastPos.set(this.mouseInfo.pos.x, this.mouseInfo.pos.y)
    this.mouseInfo.deltaPos.set(0, 0)
    this.mouseInfo.button = e.button
    this.mouseInfo.mouseDown = true

    for (const listener of this.listeners) listener.mouseDown?.(this.mouseInfo)
  }

  private onMouseMove (e: MouseEvent): void {
    if (!document.hasFocus()) return
    e.preventDefault()
    this.getMousePos(e)
    this.mouseInfo.deltaPos.set(this.mouseInfo.pos.x - this.mouseInfo.lastPos.x, this.mouseInfo.pos.y - this.mouseInfo.lastPos.y)

    for (const listener of this.listeners) listener.mouseMoved?.(this.mouseInfo)

    this.mouseInfo.lastPos.set(this.mouseInfo.pos.x, this.mouseInfo.pos.y)
  }

  private onMouseUp (e: MouseEvent): void {
    if (!document.hasFocus()) return
    e.preventDefault()
    this.getMousePos(e)
    this.mouseInfo.deltaPos.set(this.mouseInfo.pos.x - this.mouseInfo.lastPos.x, this.mouseInfo.pos.y - this.mouseInfo.lastPos.y)
    this.mouseInfo.mouseDown = false

    for (const listener of this.listeners) listener.mouseUp?.(this.mouseInfo)
  }

  private onMouseWheel (e: WheelEvent): void {
    if (!document.hasFocus()) return
    e.preventDefault()
    this.getMousePos(e)

    this.mouseInfo.wheelDeltaY = e.deltaY

    for (const listener of this.listeners) listener.mouseWheel?.(this.mouseInfo)

    this.mouseInfo.wheelDeltaY = 0
  }

  private onContextMenu (e: MouseEvent): void {
    if (!document.hasFocus()) return
    e.preventDefault()
  }

  private getMousePos (e: MouseEvent): void {
    this.mouseInfo.pos.x = e.pageX
    this.mouseInfo.pos.y = e.pageY

    const elem = this.camera.canvas
    const rect = elem.getBoundingClientRect()
    const win = elem.ownerDocument.defaultView
    this.mouseInfo.pos.x -= rect.left + (win?.scrollX ?? 0)
    this.mouseInfo.pos.y -= rect.top + (win?.scrollY ?? 0)

    this.mouseInfo.screenPos.set(this.mouseInfo.pos.x, this.mouseInfo.pos.y)
    this.camera.screenToWorld(this.mouseInfo.pos)
  }

  private onKeyDown (e: KeyboardEvent): void {
    this.keyInfo.key = e.key
    this.keyInfo.metakey = e.metaKey
    this.keyInfo.shift = e.shiftKey
    this.keyInfo.control = e.ctrlKey
    this.keyInfo.alt = e.altKey
    this.keyInfo.heldKeys.push(e.key)

    for (const listener of this.listeners) listener.keyDown?.(this.keyInfo)
  }

  private onKeyUp (e: KeyboardEvent): void {
    this.keyInfo.key = e.key
    this.keyInfo.metakey = e.metaKey
    this.keyInfo.shift = e.shiftKey
    this.keyInfo.control = e.ctrlKey
    this.keyInfo.alt = e.altKey

    if (this.keyInfo.heldKeys.includes(e.key)) this.keyInfo.heldKeys.splice(this.keyInfo.heldKeys.indexOf(e.key), 1)

    for (const listener of this.listeners) listener.keyUp?.(this.keyInfo)
  }

  addListener (listener: MouseListener): void {
    this.listeners.push(listener)
  }
}
