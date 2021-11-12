import { Camera } from "./camera";
import { Theme } from "./theme";

function clamp(x: number, min: number, max: number): number
{
    if (x < min) return min;
    if (x > max) return max;
    return x;
}

type MousePosition = { x: number, y: number };

export class Input
{
    private readonly camera: Camera;
    private cameraDrag: boolean = false;
    private mouseDown: boolean = false;

    private mousePos: MousePosition = { x: 0, y: 0 };
    private lastMousePos: MousePosition = { x: 0, y: 0 };

    constructor(camera: Camera)
    {
        this.camera = camera;

        const canvas = this.camera.canvas;
        canvas.addEventListener('mousedown', e => this.onMouseDown(e));
        canvas.addEventListener('mousemove', e => this.onMouseMove(e));
        canvas.addEventListener('mouseup', e => this.onMouseUp(e));
        canvas.addEventListener('wheel', e => this.onMouseWheel(e));
        canvas.addEventListener('contextmenu', e => this.onContextMenu(e));
    }

    private onMouseDown(e: MouseEvent): void
    {
        e.preventDefault();
        this.getMousePos(e);

        this.lastMousePos.x = this.mousePos.x;
        this.lastMousePos.y = this.mousePos.y;
        this.cameraDrag = false;

        if (e.button == 0) // Left click
            this.mouseDown = true;
        else if (e.button == 1) // Middle click
            this.cameraDrag = true;
    }

    private onMouseMove(e: MouseEvent): void
    {
        e.preventDefault();
        this.getMousePos(e);

        if (this.cameraDrag)
        {
            this.camera.pos.x += this.mousePos.x - this.lastMousePos.x;
            this.camera.pos.y += this.mousePos.y - this.lastMousePos.y;
        }

        this.lastMousePos.x = this.mousePos.x;
        this.lastMousePos.y = this.mousePos.y;
    }

    private onMouseUp(e: MouseEvent): void
    {
        e.preventDefault();

        this.mouseDown = false;
        this.cameraDrag = false;
    }

    private onMouseWheel(e: WheelEvent): void
    {
        e.preventDefault();
        this.getMousePos(e);

        const delta = e.deltaY * Theme.MOUSE_WHEEL_WEIGHT;

        let zoom: number;
        if (delta < 0) zoom = Math.pow(Theme.ZOOM_DELTA, -delta);
        else zoom = Math.pow(1 / Theme.ZOOM_DELTA, delta);

        this.camera.zoom = clamp(this.camera.zoom * zoom, Theme.MAX_ZOOM_OUT, Theme.MAX_ZOOM_IN);
        this.camera.pos.x = this.mousePos.x * this.camera.zoom - this.mousePos.x;
        this.camera.pos.y = this.mousePos.y * this.camera.zoom - this.mousePos.y;
    }

    private onContextMenu(e: MouseEvent): void
    {
        e.preventDefault();

        if (this.mouseDown) return;
    }

    private getMousePos(e: MouseEvent): void
    {
        this.mousePos.x = e.pageX;
        this.mousePos.y = e.pageY;

        const elem = this.camera.canvas;
        let rect = elem.getBoundingClientRect();
        let win = elem.ownerDocument.defaultView;
        this.mousePos.x -= rect.left + (win?.scrollX ?? 0);
        this.mousePos.y -= rect.top + (win?.scrollY ?? 0);
    }
}