import { Camera } from "./camera";
import { Theme } from "./theme";

export class Background
{
    private readonly camera: Camera;

    constructor(camera: Camera)
    {
        this.camera = camera;
    }

    render(): void
    {
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

        const minBounds = this.camera.screenToWorld(0, 0);
        const maxBounds = this.camera.screenToWorld(width, height);
        let step = Theme.GRID_SIZE;

        ctx.lineWidth = 1;
        ctx.strokeStyle = Theme.GRID_COLOR;
        this.renderLines(ctx, minBounds, maxBounds, step, width, height);

        if (Theme.GRID_MAJOR_SEGMENTS > 0)
        {
            step *= Theme.GRID_MAJOR_SEGMENTS;
            ctx.strokeStyle = Theme.GRID_MAJOR_COLOR;
            this.renderLines(ctx, minBounds, maxBounds, step, width, height);
        }
    }

    private renderLines(ctx: CanvasRenderingContext2D,
        minBounds: { x: number, y: number },
        maxBounds: { x: number, y: number },
        step: number,
        width: number,
        height: number): void
    {
        let minX = Math.ceil(minBounds.x / step) * step;
        let maxX = Math.ceil(maxBounds.x / step) * step;
        let minY = Math.ceil(minBounds.y / step) * step;
        let maxY = Math.ceil(maxBounds.y / step) * step;

        for (let x = minX; x < maxX; x += step)
        {
            const screenX = this.camera.worldToScreen(x, 0).x;

            ctx.beginPath();
            ctx.moveTo(screenX, 0);
            ctx.lineTo(screenX, height);
            ctx.closePath();
            ctx.stroke();
        }

        for (let y = minY; y < maxY; y += step)
        {
            const screenY = this.camera.worldToScreen(0, y).y;

            ctx.beginPath();
            ctx.moveTo(0, screenY);
            ctx.lineTo(width, screenY);
            ctx.closePath();
            ctx.stroke();
        }
    }
}