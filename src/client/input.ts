import { Camera } from "./camera";
import { Theme } from "./theme";

function clamp(x: number, min: number, max: number): number
{
    if (x < min) return min;
    if (x > max) return max;
    return x;
}

export class Input
{
    private readonly camera: Camera;
    private lastMouseX: number = 0;
    private lastMouseY: number = 0;
    private cameraDrag: boolean = false;
    private mouseDown: boolean = false;

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
        const { x: mouseX, y: mouseY } = this.camera.pageToScreen(e.pageX, e.pageY);

        this.lastMouseX = mouseX;
        this.lastMouseY = mouseY;
        this.cameraDrag = false;

        if (e.button == 0) // Left click
            this.mouseDown = true;
        else if (e.button == 1) // Middle click
            this.cameraDrag = true;
    }

    private onMouseMove(e: MouseEvent): void
    {
        e.preventDefault();
        const { x: mouseX, y: mouseY } = this.camera.pageToScreen(e.pageX, e.pageY);

        if (this.cameraDrag)
        {
            this.camera.x += mouseX - this.lastMouseX;
            this.camera.y += mouseY - this.lastMouseY;
        }

        this.lastMouseX = mouseX;
        this.lastMouseY = mouseY;
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

        const { x: mouseX, y: mouseY } = this.camera.pageToScreen(e.pageX, e.pageY);
        const delta = e.deltaY * Theme.MOUSE_WHEEL_WEIGHT;

        let zoom: number;
        if (delta < 0) zoom = Math.pow(Theme.ZOOM_DELTA, -delta);
        else zoom = Math.pow(1 / Theme.ZOOM_DELTA, delta);

        this.camera.zoom = clamp(this.camera.zoom * zoom, Theme.MAX_ZOOM_OUT, Theme.MAX_ZOOM_IN);
        this.camera.x = mouseX * this.camera.zoom - mouseX;
        this.camera.y = mouseY * this.camera.zoom - mouseY;
    }

    private onContextMenu(e: MouseEvent): void
    {
        e.preventDefault();

        if (this.mouseDown) return;
    }
}