import { Camera } from "./camera";
import { ContextMenu } from "./contextmenu";
import { Position } from "./position";
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
    private readonly contextMenu: ContextMenu;
    private readonly mousePos: Position = new Position();
    private readonly lastMousePos: Position = new Position();

    // Buffer
    private readonly zoomCenter: Position = new Position();

    constructor(camera: Camera, contextMenu: ContextMenu)
    {
        this.camera = camera;
        this.contextMenu = contextMenu;

        const canvas = this.camera.canvas;
        canvas.addEventListener('mousedown', e => this.onMouseDown(e));
        canvas.addEventListener('mousemove', e => this.onMouseMove(e));
        canvas.addEventListener('mouseup', e => this.onMouseUp(e));
        canvas.addEventListener('wheel', e => this.onMouseWheel(e));
        canvas.addEventListener('contextmenu', e => this.onContextMenu(e));
    }

    private onMouseDown(e: MouseEvent): void
    {
        if (!document.hasFocus()) return;

        e.preventDefault();
        this.getMousePos(e);

        this.lastMousePos.x = this.mousePos.x;
        this.lastMousePos.y = this.mousePos.y;

        if (e.button === 0) // Left click
        {
            if (this.contextMenu.isVisible && !this.contextMenu.isInBounds(this.mousePos))
                this.contextMenu.close();
        }
        else if (e.button === 1) // Middle click
        {
            this.contextMenu.close();
        }
    }

    private onMouseMove(e: MouseEvent): void
    {
        if (!document.hasFocus()) return;

        e.preventDefault();
        this.getMousePos(e);

        if (this.contextMenu.isVisible)
            this.contextMenu.updateSelection(this.mousePos);

        this.lastMousePos.x = this.mousePos.x;
        this.lastMousePos.y = this.mousePos.y;
    }

    private onMouseUp(e: MouseEvent): void
    {
        if (!document.hasFocus()) return;

        e.preventDefault();
        this.getMousePos(e);

        // Does nothing if menu is hidden
        this.contextMenu.selectOptionAt(this.mousePos);
    }

    private onMouseWheel(e: WheelEvent): void
    {
        if (!document.hasFocus()) return;

        e.preventDefault();
        this.getMousePos(e);

        const delta = e.deltaY * Theme.MOUSE_WHEEL_WEIGHT;

        let zoom: number;
        if (delta < 0) zoom = Math.pow(Theme.ZOOM_DELTA, -delta);
        else zoom = Math.pow(1 / Theme.ZOOM_DELTA, delta);

        this.zoomCenter.set(this.mousePos.x, this.mousePos.y);
        this.camera.screenToWorld(this.zoomCenter, true);

        this.camera.zoom = clamp(this.camera.zoom * zoom, Theme.MAX_ZOOM_OUT, Theme.MAX_ZOOM_IN);

        this.camera.screenToWorld(this.mousePos, true);
        this.camera.pos.x += this.mousePos.x - this.zoomCenter.x;
        this.camera.pos.y += this.mousePos.y - this.zoomCenter.y;
    }

    private onContextMenu(e: MouseEvent): void
    {
        if (!document.hasFocus()) return;

        e.preventDefault();
        this.getMousePos(e);

        this.contextMenu.openAt(this.mousePos);
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