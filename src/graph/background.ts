import { Camera } from "./camera";
import { Bounds, Position } from "./position";
import { Theme } from "../rendering/theme";

export class Background
{
    private readonly camera: Camera;
    private _needsRepaint: boolean = true;

    // Buffers
    private readonly bounds: Bounds = new Bounds();
    private readonly gridPos: Position = new Position();

    constructor(camera: Camera)
    {
        this.camera = camera;
    }

    get needsRepaint(): boolean
    {
        return this._needsRepaint;
    }

    render(): void
    {
        this._needsRepaint = false;
        this.camera.canvas.width = this.camera.canvas.clientWidth;
        this.camera.canvas.height = this.camera.canvas.clientHeight;
        this.camera.canvas.width = this.camera.canvas.clientWidth;

        this.fillBackground();

        if (Theme.DRAW_GRID)
            this.renderGrid();
    }

    private fillBackground(): void
    {
        const width = this.camera.canvasWidth;
        const height = this.camera.canvasHeight;
        const ctx = this.camera.ctx;

        ctx.fillStyle = Theme.BACKGROUND_COLOR;
        ctx.fillRect(0, 0, width, height);
    }

    private renderGrid(): void
    {
        const width = this.camera.canvasWidth;
        const height = this.camera.canvasHeight;
        const ctx = this.camera.ctx;

        this.bounds.set(0, 0, width, height)
        this.camera.screenToWorld(this.bounds);
        let step = Theme.GRID_SIZE;

        ctx.lineWidth = 1;
        ctx.strokeStyle = Theme.GRID_COLOR;
        this.renderLines(ctx, step);

        if (Theme.GRID_MAJOR_SEGMENTS > 0)
        {
            step *= Theme.GRID_MAJOR_SEGMENTS;
            ctx.strokeStyle = Theme.GRID_MAJOR_COLOR;
            this.renderLines(ctx, step);
        }
    }

    private renderLines(ctx: CanvasRenderingContext2D, step: number): void
    {
        let minX = Math.ceil(this.bounds.min.x / step) * step;
        let maxX = Math.ceil(this.bounds.max.x / step) * step;
        let minY = Math.ceil(this.bounds.min.y / step) * step;
        let maxY = Math.ceil(this.bounds.max.y / step) * step;

        for (let x = minX; x < maxX; x += step)
        {
            this.gridPos.set(x, 0);
            this.camera.worldToScreen(this.gridPos);

            ctx.beginPath();
            ctx.moveTo(this.gridPos.x, 0);
            ctx.lineTo(this.gridPos.x, this.camera.canvasHeight);
            ctx.closePath();
            ctx.stroke();
        }

        for (let y = minY; y < maxY; y += step)
        {
            this.gridPos.set(0, y);
            this.camera.worldToScreen(this.gridPos);

            ctx.beginPath();
            ctx.moveTo(0, this.gridPos.y);
            ctx.lineTo(this.camera.canvasWidth, this.gridPos.y);
            ctx.closePath();
            ctx.stroke();
        }
    }
}