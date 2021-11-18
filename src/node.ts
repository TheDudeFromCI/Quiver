import { Camera } from "./camera";
import { NodeType } from "./nodetype";
import { Position } from "./position";
import { Theme } from "./theme";

function roundedRect(ctx: CanvasRenderingContext2D,
    x: number, y: number,
    width: number, height: number,
    radius: number): void
{
    ctx.beginPath();
    ctx.moveTo(x + radius, y);
    ctx.lineTo(x + width - radius, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
    ctx.lineTo(x + width, y + height - radius);
    ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    ctx.lineTo(x + radius, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
    ctx.lineTo(x, y + radius);
    ctx.quadraticCurveTo(x, y, x + radius, y);
    ctx.closePath();
}

export class GraphNode
{
    public readonly pos: Position = new Position();
    public readonly type: NodeType;
    public selected: boolean = false;

    // Buffer
    private readonly screenPos: Position = new Position();

    constructor(type: NodeType)
    {
        this.type = type;
    }

    get x(): number
    {
        return this.pos.x;
    }

    set x(value: number)
    {
        this.pos.x = value;
    }

    get y(): number
    {
        return this.pos.y;
    }

    set y(value: number)
    {
        this.pos.y = value;
    }

    get width(): number
    {
        return Theme.NODE_WIDTH;
    }

    get height(): number
    {
        const plugs = this.type.inputs.length + this.type.outputs.length + 1;
        return Theme.NODE_PLUG_HEIGHT * plugs;
    }

    render(camera: Camera): void
    {
        const ctx = camera.ctx;

        this.screenPos.set(this.pos.x, this.pos.y);
        camera.worldToScreen(this.screenPos);

        const lineHeight = Theme.NODE_PLUG_HEIGHT / camera.zoomSmooth;
        const plugSize = Theme.PLUG_SIZE / camera.zoomSmooth;
        const plugBuffer = Theme.PLUG_BUFFER_SIZE / camera.zoomSmooth;
        const width = this.width / camera.zoomSmooth;
        const height = this.height / camera.zoomSmooth;
        const x = this.screenPos.x;
        let y = this.screenPos.y;

        ctx.fillStyle = Theme.NODE_COLOR;
        roundedRect(ctx, x, y, width, height, 5 / camera.zoomSmooth);
        ctx.fill();

        if (this.selected)
        {
            ctx.strokeStyle = Theme.NODE_SELECTED_COLOR;
            ctx.lineWidth = 2;
            ctx.stroke();
        }

        ctx.fillStyle = Theme.NODE_TEXT_COLOR;
        ctx.font = `${16 / camera.zoomSmooth}px Calibri`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        y += lineHeight * 0.5;
        ctx.fillText(this.type.name, x + width / 2, y + 2);

        ctx.textAlign = 'left';
        for (let plug of this.type.inputs)
        {
            y += lineHeight;

            ctx.fillStyle = Theme.PLUG_COLOR;
            ctx.beginPath();
            ctx.arc(x + plugBuffer / 2, y, plugSize / 2, 0, 2 * Math.PI);
            ctx.fill();

            ctx.fillStyle = Theme.NODE_TEXT_COLOR
            ctx.fillText(plug.name, x + plugBuffer, y + 2);
        }

        ctx.textAlign = 'right';
        for (let plug of this.type.outputs)
        {
            y += lineHeight;

            ctx.fillStyle = Theme.PLUG_COLOR;
            ctx.beginPath();
            ctx.arc(x + width - plugBuffer / 2, y, plugSize / 2, 0, 2 * Math.PI);
            ctx.fill();

            ctx.fillStyle = Theme.NODE_TEXT_COLOR
            ctx.fillText(plug.name, x + width - plugBuffer, y + 2);
        }
    }

    getPlugAt(pos: Position): number
    {
        let x = this.x + Theme.PLUG_BUFFER_SIZE / 2;
        let y = this.y + Theme.NODE_PLUG_HEIGHT * 1.5;

        for (let i = 0; i < this.type.inputs.length; i++)
        {
            if (pos.distance(x, y) <= Theme.PLUG_BUFFER_SIZE / 2) return i;
            y += Theme.NODE_PLUG_HEIGHT;
        }

        x = this.x + this.width - Theme.PLUG_BUFFER_SIZE / 2;

        for (let i = 0; i < this.type.outputs.length; i++)
        {
            if (pos.distance(x, y) <= Theme.PLUG_BUFFER_SIZE / 2) return i + this.type.inputs.length;
            y += Theme.NODE_PLUG_HEIGHT;
        }

        return -1;
    }
}
