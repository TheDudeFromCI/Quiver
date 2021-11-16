import { Background } from "./background";
import { Camera } from "./camera";
import { ContextMenu } from "./contextmenu";
import { DragHandler } from "./draghandler";
import { Input } from "./input";
import { NodeHandler } from "./nodehandler";
import { Selection } from "./selection";

export class Graph
{
    public readonly camera: Camera;
    public readonly background: Background;
    public readonly contextMenu: ContextMenu;
    public readonly nodeHandler: NodeHandler;
    public readonly dragHandler: DragHandler;
    public readonly selection: Selection;
    public readonly input: Input;

    constructor(canvas: HTMLCanvasElement)
    {
        this.camera = new Camera(canvas);
        this.background = new Background(this.camera);
        this.contextMenu = new ContextMenu(this.camera);
        this.nodeHandler = new NodeHandler(this.camera);
        this.dragHandler = new DragHandler(this.camera);
        this.selection = new Selection(this.dragHandler, this.nodeHandler);
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
        this.nodeHandler.render();
        this.selection.render(this.camera.ctx);
        this.contextMenu.render();

        this.markRepainted();
    }

    private needsRepaint(): boolean
    {
        let needsRepaint = false;
        needsRepaint ||= this.camera.needsRepaint;
        needsRepaint ||= this.background.needsRepaint;
        needsRepaint ||= this.nodeHandler.needsRepaint;
        needsRepaint ||= this.selection.needsRepaint;
        needsRepaint ||= this.contextMenu.needsRepaint;
        return needsRepaint;
    }

    private markRepainted(): void
    {
        this.camera.markRepainted();
        this.background.markRepainted();
        this.nodeHandler.markRepainted();
        this.contextMenu.markRepainted();
    }
}