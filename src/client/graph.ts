import { Background } from "./background";
import { Camera } from "./camera";
import { Input } from "./input";
import { GraphNode } from "./node";

export class Graph
{
    public readonly camera: Camera;
    public readonly background: Background;
    public readonly input: Input;

    private lastFrame: number = 0;
    private nodes: GraphNode[] = [];

    constructor(canvas: HTMLCanvasElement)
    {
        this.camera = new Camera(canvas);
        this.background = new Background(this.camera);
        this.input = new Input(this.camera);
    }

    start(): void
    {
        requestAnimationFrame(t => this.animation(t));
    }

    private animation(time: number): void
    {
        requestAnimationFrame(t => this.animation(t));

        const delta = (time - this.lastFrame) / 1000.0;
        if (delta < 1 / 60) return; // Limit to 60 fps

        this.lastFrame = time;

        this.update(delta);
        this.render();
    }

    private update(delta: number): void
    {
        this.camera.update(delta);
    }

    private render(): void
    {
        this.background.render();
    }

    addNode(node: GraphNode): void
    {
        this.nodes.push(node);
    }
}