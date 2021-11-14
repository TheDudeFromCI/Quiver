import { Camera } from "./camera";
import { NodeType } from "./nodetype";
import { Position } from "./position";
import { Theme } from "./theme";

export class GraphNode
{
    public readonly pos: Position = new Position();
    public readonly type: NodeType;

    // Buffer
    private readonly screenPos: Position = new Position();

    constructor(type: NodeType)
    {
        this.type = type;
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
        this.screenPos.set(this.pos.x, this.pos.y);
        camera.worldToScreen(this.screenPos);

        const lineHeight = Theme.NODE_PLUG_HEIGHT / camera.zoomSmooth;
        const plugSize = Theme.PLUG_SIZE / camera.zoomSmooth;
        const plugBuffer = Theme.PLUG_BUFFER_SIZE / camera.zoomSmooth;
        const width = this.width / camera.zoomSmooth;
        const height = this.height / camera.zoomSmooth;
        const x = this.screenPos.x;
        let y = this.screenPos.y;

        const ctx = camera.ctx;
        ctx.fillStyle = Theme.NODE_COLOR;
        ctx.fillRect(x, y, width, height);

        ctx.fillStyle = Theme.NODE_TEXT_COLOR;
        ctx.font = `${16 / camera.zoomSmooth}px Calibri`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';

        y += lineHeight * 0.5;
        ctx.fillText(this.type.name, x + width / 2, y);

        ctx.textAlign = 'left';
        for (let plug of this.type.inputs)
        {
            y += lineHeight;

            ctx.fillStyle = Theme.PLUG_COLOR;
            ctx.beginPath();
            ctx.arc(x + plugBuffer / 2, y, plugSize / 2, 0, 2 * Math.PI);
            ctx.fill();

            ctx.fillStyle = Theme.NODE_TEXT_COLOR
            ctx.fillText(plug.name, x + plugBuffer, y);
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
            ctx.fillText(plug.name, x + width - plugBuffer, y);
        }
    }
}
