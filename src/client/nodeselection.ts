import { InputHandler, MouseListener as MouseListener, MouseInfo } from "./inputhandler";
import { GraphNode } from "./node";
import { NodeHandler } from "./nodehandler";
import { Bounds } from "./position";

export class NodeSelection implements MouseListener
{
    private readonly nodeHandler: NodeHandler;
    private selNodes: GraphNode[] = [];
    private selBounds?: Bounds;
    private _needsRepaint: boolean = false;

    constructor(inputHandler: InputHandler, nodeHandler: NodeHandler)
    {
        this.nodeHandler = nodeHandler;

        inputHandler.addListener(this);
    }

    get needsRepaint(): boolean
    {
        return this._needsRepaint;
    }

    render(ctx: CanvasRenderingContext2D): void
    {
        this._needsRepaint = false;
        if (this.selBounds == null) return;

        ctx.strokeStyle = '#000000';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.rect(this.selBounds.x, this.selBounds.y, this.selBounds.width, this.selBounds.height);
        ctx.stroke();
    }

    mouseDown(mouse: MouseInfo): void
    {
        if (mouse.button !== 0) return;

        const node = this.nodeHandler.getNodeAt(mouse.pos);

        if (node == null)
        {
            this.selBounds = new Bounds(mouse.pos.x, mouse.pos.y, 0, 0);
            for (let n of this.selNodes) n.selected = false;
            this.selNodes = [];
        }
        else if (!node.selected)
        {
            for (let n of this.selNodes) n.selected = false;
            this.selNodes = [node];
            node.selected = true;
        }

        this._needsRepaint = true;
    }

    mouseMoved(mouse: MouseInfo): void
    {
        if (mouse.button !== 0 || !mouse.mouseDown) return;

        if (this.selBounds == null)
        {
            for (let node of this.selNodes)
            {
                node.x += mouse.deltaPos.x;
                node.y += mouse.deltaPos.y;
                this._needsRepaint = true;
            }
        }
        else
        {
            this.selBounds.setBetween(mouse.pos, mouse.startPos);
            this._needsRepaint = true;

            for (let node of this.selNodes) node.selected = false;
            this.selNodes = this.nodeHandler.getNodesInRegion(this.selBounds);
            for (let node of this.selNodes) node.selected = true;
        }
    }

    mouseUp(mouse: MouseInfo): void
    {
        if (mouse.button !== 0) return;

        this.selBounds = undefined;
        this._needsRepaint = true;
    }
}