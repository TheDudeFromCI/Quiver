import { Bounds, Position } from "./position";
import { Theme } from "./theme";

function lerp(a: number, b: number, t: number): number
{
    return a * (1 - t) + b * t;
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
        this._needsRepaint ||= this._posSmooth.distanceSquared(this.pos) > 0.01;
        this._needsRepaint ||= Math.abs(this._zoomSmooth - this.zoom) > 0.01;

        delta /= Theme.CAMERA_SMOOTHING;
        this._posSmooth.lerpTo(this.pos, delta);
        this._zoomSmooth = lerp(this._zoomSmooth, this.zoom, delta);
    }

    screenToWorld(pos: Position | Bounds): void
    {
        if (pos instanceof Position)
        {
            pos.x = pos.x * this._zoomSmooth - this._posSmooth.x;
            pos.y = pos.y * this._zoomSmooth - this._posSmooth.y;
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