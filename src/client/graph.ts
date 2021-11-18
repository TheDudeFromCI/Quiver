import { Background } from "./background";
import { Camera, CameraControls } from "./camera";
import { ContextMenu } from "./contextmenu";
import { InputHandler } from "./inputhandler";
import { NodeHandler } from "./nodehandler";
import { Selection } from "./selection";

export class Graph
{
    public readonly camera: Camera;
    public readonly inputHandler: InputHandler;
    public readonly cameraControls: CameraControls;
    public readonly background: Background;
    public readonly nodeHandler: NodeHandler;
    public readonly selection: Selection;
    public readonly contextMenu: ContextMenu;

    constructor(canvas: HTMLCanvasElement)
    {
        this.camera = new Camera(canvas);
        this.inputHandler = new InputHandler(this.camera);
        this.cameraControls = new CameraControls(this.camera, this.inputHandler);
        this.background = new Background(this.camera);
        this.nodeHandler = new NodeHandler(this.camera);
        this.selection = new Selection(this.inputHandler, this.nodeHandler);
        this.contextMenu = new ContextMenu(this.camera, this.inputHandler);
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