import { Camera } from "./camera";
import { GraphNode } from "./node";
import { Position } from "./position";
import { Theme } from "../rendering/theme";

export class Connection
{
    public readonly nodeA: GraphNode;
    public readonly nodeB: GraphNode;
    public readonly plugA: number;
    public readonly plugB: number;

    // Buffer
    private readonly plugAPos: Position = new Position();
    private readonly plugBPos: Position = new Position();

    constructor(nodeA: GraphNode, nodeB: GraphNode, plugA: number, plugB: number)
    {
        this.nodeA = nodeA;
        this.nodeB = nodeB;
        this.plugA = plugA;
        this.plugB = plugB;
    }

    private getPlugPos(node: GraphNode, plug: number, input: boolean, out: Position): void
    {
        if (input)
        {
            const index = plug + 1.5;
            out.set(node.pos.x, node.pos.y + index * Theme.NODE_PLUG_HEIGHT);
        }
        else
        {
            const index = plug + node.type.inputs.length + 1.5;
            out.set(node.pos.x + node.width, node.pos.y + index * Theme.NODE_PLUG_HEIGHT);
        }
    }

    render(camera: Camera): void
    {
        this.getPlugPos(this.nodeA, this.plugA, false, this.plugAPos);
        this.getPlugPos(this.nodeB, this.plugB, true, this.plugBPos);
        camera.worldToScreen(this.plugAPos);
        camera.worldToScreen(this.plugBPos);

        const ctx = camera.ctx;
        ctx.strokeStyle = Theme.CONNECTION_COLOR;
        ctx.lineWidth = Theme.CONNECTION_THICKNESS;

        const center = (this.plugAPos.x + this.plugBPos.x) / 2;

        ctx.beginPath();
        ctx.moveTo(this.plugAPos.x, this.plugAPos.y);
        ctx.bezierCurveTo(
            center, this.plugAPos.y,
            center, this.plugBPos.y,
            this.plugBPos.x, this.plugBPos.y);
        ctx.stroke();
    }
}