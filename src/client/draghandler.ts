import { Camera } from "./camera";
import { Position } from "./position";

export interface DragListener
{
    dragStarted?(mouse: MouseInfo): void;
    dragUpdated?(mouse: MouseInfo): void;
    dragEnded?(mouse: MouseInfo): void;
}

export class MouseInfo
{
    public readonly pos: Position = new Position();
    public readonly deltaPos: Position = new Position();
    public readonly lastPos: Position = new Position();
    public readonly startPos: Position = new Position();
    public button: number = 0;
}

export class DragHandler
{
    private readonly camera: Camera;
    private readonly mouseInfo: MouseInfo = new MouseInfo();
    private readonly listeners: DragListener[] = [];
    private mouseDown: boolean = false;

    constructor(camera: Camera)
    {
        this.camera = camera;

        const canvas = this.camera.canvas;
        canvas.addEventListener('mousedown', e => this.onMouseDown(e));
        canvas.addEventListener('mousemove', e => this.onMouseMove(e));
        canvas.addEventListener('mouseup', e => this.onMouseUp(e));
    }

    private onMouseDown(e: MouseEvent): void
    {
        this.getMousePos(e);
        this.mouseInfo.startPos.set(this.mouseInfo.pos.x, this.mouseInfo.pos.y);
        this.mouseInfo.lastPos.set(this.mouseInfo.pos.x, this.mouseInfo.pos.y);
        this.mouseInfo.deltaPos.set(0, 0);
        this.mouseInfo.button = e.button;
        this.mouseDown = true;

        for (let listener of this.listeners)
            listener.dragStarted?.(this.mouseInfo);
    }

    private onMouseMove(e: MouseEvent): void
    {
        if (!this.mouseDown) return;

        this.getMousePos(e);
        this.mouseInfo.deltaPos.set(this.mouseInfo.pos.x - this.mouseInfo.lastPos.x, this.mouseInfo.pos.y - this.mouseInfo.lastPos.y);

        for (let listener of this.listeners)
            listener.dragUpdated?.(this.mouseInfo);

        this.mouseInfo.lastPos.set(this.mouseInfo.pos.x, this.mouseInfo.pos.y);
    }

    private onMouseUp(e: MouseEvent): void
    {
        this.getMousePos(e);
        this.mouseInfo.deltaPos.set(this.mouseInfo.pos.x - this.mouseInfo.lastPos.x, this.mouseInfo.pos.y - this.mouseInfo.lastPos.y);
        this.mouseDown = false;

        for (let listener of this.listeners)
            listener.dragEnded?.(this.mouseInfo);
    }

    private getMousePos(e: MouseEvent): void
    {
        this.mouseInfo.pos.x = e.pageX;
        this.mouseInfo.pos.y = e.pageY;

        const elem = this.camera.canvas;
        let rect = elem.getBoundingClientRect();
        let win = elem.ownerDocument.defaultView;
        this.mouseInfo.pos.x -= rect.left + (win?.scrollX ?? 0);
        this.mouseInfo.pos.y -= rect.top + (win?.scrollY ?? 0);

        this.camera.screenToWorld(this.mouseInfo.pos);
    }

    addListener(listener: DragListener): void
    {
        this.listeners.push(listener);
    }
}