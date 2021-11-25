import { Camera } from "./camera";
import { InputHandler, MouseInfo, MouseListener } from "./inputhandler";
import { GraphNode } from "./node";
import { NodeHandler } from "./nodehandler";
import { Position } from "./position";
import { Theme } from "../rendering/theme";

class SelectedPlug
{
    public readonly node: GraphNode;
    public readonly index: number;
    public readonly isInput: boolean;

    constructor(node: GraphNode, index: number, isInput: boolean)
    {
        this.node = node;
        this.index = index;
        this.isInput = isInput;
    }
}

export class PlugSelection implements MouseListener
{
    private readonly camera: Camera;
    private readonly nodeHandler: NodeHandler;
    private selectedPlug?: SelectedPlug;
    private _needsRepaint: boolean = false;

    // Buffer
    private readonly plugPos: Position = new Position();
    private readonly mousePos: Position = new Position();

    constructor(camera: Camera, nodeHandler: NodeHandler, inputHandler: InputHandler)
    {
        this.camera = camera;
        this.nodeHandler = nodeHandler;
        inputHandler.addListener(this);
    }

    get needsRepaint(): boolean
    {
        return this._needsRepaint;
    }

    render(): void
    {
        this._needsRepaint = false;
        if (this.selectedPlug == null) return;

        const node = this.selectedPlug.node;
        const visualIndex = this.selectedPlug.index + 1.5;

        if (this.selectedPlug.isInput)
            this.plugPos.set(node.pos.x, node.pos.y + visualIndex * Theme.NODE_PLUG_HEIGHT);
        else
            this.plugPos.set(node.pos.x + node.width, node.pos.y + (visualIndex + node.type.inputs.length) * Theme.NODE_PLUG_HEIGHT);

        this.camera.worldToScreen(this.plugPos);

        const ctx = this.camera.ctx;
        ctx.strokeStyle = Theme.CONNECTION_COLOR;
        ctx.lineWidth = Theme.CONNECTION_THICKNESS;

        const center = (this.plugPos.x + this.mousePos.x) / 2;

        ctx.beginPath();
        ctx.moveTo(this.plugPos.x, this.plugPos.y);
        ctx.bezierCurveTo(
            center, this.plugPos.y,
            center, this.mousePos.y,
            this.mousePos.x, this.mousePos.y);
        ctx.stroke();
    }

    mouseDown(mouse: MouseInfo): void
    {
        if (mouse.button !== 0) return;

        const node = this.nodeHandler.getNodeAt(mouse.pos);
        if (node == null) return;

        let plugIndex = node.getPlugAt(mouse.pos);
        let isInput = true;

        if (plugIndex === -1) return;

        if (plugIndex >= node.type.inputs.length)
        {
            plugIndex -= node.type.inputs.length;
            isInput = false;
        }

        this.selectedPlug = new SelectedPlug(node, plugIndex, isInput);
        this._needsRepaint = true;
    }

    mouseMoved(mouse: MouseInfo): void
    {
        this.mousePos.set(mouse.screenPos.x, mouse.screenPos.y);
        if (this.selectedPlug != null) this._needsRepaint = true;
    }

    mouseUp(mouse: MouseInfo): void
    {
        if (this.selectedPlug == null) return;

        const node = this.nodeHandler.getNodeAt(mouse.pos);
        let plugIndex = node?.getPlugAt(mouse.pos) ?? -1;

        if (node != null && plugIndex !== -1 && this.canPlaceConnection(node, plugIndex))
        {
            if (this.selectedPlug.isInput)
                this.nodeHandler.addConnection(node, this.selectedPlug.node,
                    plugIndex, this.selectedPlug.index - node.type.inputs.length);
            else
                this.nodeHandler.addConnection(this.selectedPlug.node, node,
                    this.selectedPlug.index, plugIndex);
        }

        this.selectedPlug = undefined;
        this._needsRepaint = true;
    }

    private canPlaceConnection(node: GraphNode, plugIndex: number): boolean
    {
        if (this.selectedPlug == null) return false;

        const isTargetInput = plugIndex < node.type.inputs.length;
        if (isTargetInput === this.selectedPlug.isInput) return false;

        if (isTargetInput)
            return !this.nodeHandler.isNodeDecendantOf(this.selectedPlug.node, node);
        else
            return !this.nodeHandler.isNodeDecendantOf(node, this.selectedPlug.node);
    }
}