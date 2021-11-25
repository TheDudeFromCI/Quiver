import { InputHandler, MouseListener, MouseInfo } from "./inputhandler";
import { Bounds, Position } from "./position";
import { Theme } from "../rendering/theme";

function lerp(a: number, b: number, t: number): number
{
    if (t <= 0) return a;
    if (t >= 1) return b;
    return a * (1 - t) + b * t;
}

function clamp(x: number, min: number, max: number): number
{
    if (x < min) return min;
    if (x > max) return max;
    return x;
}

export class Camera
{
    public readonly canvas: HTMLCanvasElement;
    public readonly ctx: CanvasRenderingContext2D;

    public pos: Position = new Position();
    public zoom: number = 1;
    private _posSmooth: Position = new Position();
    private _zoomSmooth: number = this.zoom;
    private _needsRepaint: boolean = true;

    constructor(canvas: HTMLCanvasElement)
    {
        this.canvas = canvas;

        const ctx = canvas.getContext('2d');
        if (ctx == null) throw new Error('Canvas is not renderable!');
        else this.ctx = ctx;

        this.canvas.tabIndex = 1;
    }

    get canvasWidth(): number
    {
        return this.canvas.width;
    }

    get canvasHeight(): number
    {
        return this.canvas.height;
    }

    get posSmooth(): Position
    {
        return this._posSmooth;
    }

    get zoomSmooth(): number
    {
        return this._zoomSmooth;
    }

    get needsRepaint(): boolean
    {
        return this._needsRepaint;
    }

    markRepainted(): void
    {
        this._needsRepaint = false;
    }

    update(delta: number): void
    {
        this._needsRepaint ||= this.canvas.width != this.canvas.clientWidth;
        this._needsRepaint ||= this.canvas.height != this.canvas.clientHeight;
        this._needsRepaint ||= this._posSmooth.distance(this.pos) > 0.01;
        this._needsRepaint ||= Math.abs(this._zoomSmooth - this.zoom) > 0.01;

        delta /= Theme.CAMERA_SMOOTHING;
        this._posSmooth.lerpTo(this.pos, delta);
        this._zoomSmooth = lerp(this._zoomSmooth, this.zoom, delta);
    }

    screenToWorld(pos: Position | Bounds, targetPos: boolean = false): void
    {
        const zoom = targetPos ? this.zoom : this._zoomSmooth;
        const camPos = targetPos ? this.pos : this._posSmooth;

        if (pos instanceof Position)
        {
            pos.x = pos.x * zoom - camPos.x;
            pos.y = pos.y * zoom - camPos.y;
        }
        else
        {
            this.screenToWorld(pos.min);
            this.screenToWorld(pos.max);
        }
    }

    worldToScreen(pos: Position | Bounds): void
    {
        if (pos instanceof Position)
        {
            pos.x = (pos.x + this._posSmooth.x) / this._zoomSmooth;
            pos.y = (pos.y + this._posSmooth.y) / this._zoomSmooth;
        }
        else
        {
            this.worldToScreen(pos.min);
            this.worldToScreen(pos.max);
        }
    }
}

export class CameraControls implements MouseListener
{
    private readonly camera: Camera;

    // Buffer
    private readonly zoomTarget: Position = new Position();

    constructor(camera: Camera, inputHandler: InputHandler)
    {
        this.camera = camera;
        inputHandler.addListener(this);
    }

    mouseMoved(mouse: MouseInfo): void
    {
        if (mouse.button !== 1 || !mouse.mouseDown) return;
        this.camera.pos.x += mouse.deltaPos.x;
        this.camera.pos.y += mouse.deltaPos.y;
    }

    mouseWheel(mouse: MouseInfo): void
    {
        const delta = mouse.wheelDeltaY * Theme.MOUSE_WHEEL_WEIGHT;

        let zoom: number;
        if (delta < 0) zoom = Math.pow(Theme.ZOOM_DELTA, -delta);
        else zoom = Math.pow(1 / Theme.ZOOM_DELTA, delta);

        this.zoomTarget.set(mouse.pos.x, mouse.pos.y);
        this.camera.worldToScreen(this.zoomTarget);

        this.camera.zoom = clamp(this.camera.zoom * zoom, Theme.MAX_ZOOM_OUT, Theme.MAX_ZOOM_IN);

        this.camera.screenToWorld(this.zoomTarget, true);
        this.camera.pos.x += this.zoomTarget.x - mouse.pos.x;
        this.camera.pos.y += this.zoomTarget.y - mouse.pos.y;
    }
}