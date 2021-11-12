import { Theme } from "./theme";

function lerp(a: number, b: number, t: number): number
{
    return a * (1 - t) + b * t;
}

export class Camera
{
    public readonly canvas: HTMLCanvasElement;
    public readonly ctx: CanvasRenderingContext2D;

    public x: number = 0;
    public y: number = 0;
    public zoom: number = 1;
    private _xSmooth: number = this.x;
    private _ySmooth: number = this.y;
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

    get xSmooth(): number
    {
        return this._xSmooth;
    }

    get ySmooth(): number
    {
        return this._ySmooth;
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
        this._needsRepaint ||= Math.abs(this._xSmooth - this.x) > 0.01;
        this._needsRepaint ||= Math.abs(this._ySmooth - this.y) > 0.01;
        this._needsRepaint ||= Math.abs(this._zoomSmooth - this.zoom) > 0.01;

        delta /= Theme.CAMERA_SMOOTHING;
        this._xSmooth = lerp(this._xSmooth, this.x, delta);
        this._ySmooth = lerp(this._ySmooth, this.y, delta);
        this._zoomSmooth = lerp(this._zoomSmooth, this.zoom, delta);
    }

    screenToWorld(x: number, y: number): { x: number, y: number }
    {
        return {
            x: x * this._zoomSmooth - this._xSmooth,
            y: y * this._zoomSmooth - this._ySmooth,
        }
    }

    worldToScreen(x: number, y: number): { x: number, y: number }
    {
        return {
            x: (x + this._xSmooth) / this._zoomSmooth,
            y: (y + this._ySmooth) / this._zoomSmooth,
        }
    }

    pageToScreen(x: number, y: number): { x: number, y: number }
    {
        const elem = this.canvas;
        let top = 0;
        let left = 0;

        if (elem.getClientRects().length)
        {
            let rect = elem.getBoundingClientRect();
            let win = elem.ownerDocument.defaultView;
            top = rect.top + (win?.pageYOffset ?? 0);
            left = rect.left + (win?.pageXOffset ?? 0);
        }

        return {
            x: x - left,
            y: y - top,
        }
    }
}