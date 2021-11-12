import { Background } from "./background";
import { Camera } from "./camera";
import { ContextMenu } from "./contextmenu";
import { Input } from "./input";
import { GraphNode } from "./node";

export class Graph
{
    public readonly camera: Camera;
    public readonly background: Background;
    public readonly contextMenu: ContextMenu;
    public readonly input: Input;

    private nodes: GraphNode[] = [];

    constructor(canvas: HTMLCanvasElement)
    {
        this.camera = new Camera(canvas);
        this.background = new Background(this.camera);
        this.contextMenu = new ContextMenu(this.camera);
        this.input = new Input(this.camera, this.contextMenu);
    }

    update(delta: number): void
    {
        this.camera.update(delta);
        this.background.update();
    }

    render(): void
    {
        if (!this.needsRepaint()) return;

        this.background.render();
        this.contextMenu.render();

        this.markRepainted();
    }

    private needsRepaint(): boolean
    {
        let needsRepaint = false;
        needsRepaint ||= this.camera.needsRepaint;
        needsRepaint ||= this.background.needsRepaint;
        needsRepaint ||= this.contextMenu.needsRepaint;
        return needsRepaint;
    }

    private markRepainted(): void
    {
        this.camera.markRepainted();
        this.background.markRepainted();
        this.contextMenu.markRepainted();
    }

    addNode(node: GraphNode): void
    {
        this.nodes.push(node);
    }
}