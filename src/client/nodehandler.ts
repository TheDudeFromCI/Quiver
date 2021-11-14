import { Camera } from "./camera";
import { GraphNode } from "./node";
import { NodeType } from "./nodetype";

export class NodeHandler
{
    private readonly camera: Camera;
    private readonly nodes: GraphNode[] = [];

    constructor(camera: Camera)
    {
        this.camera = camera;
    }

    addNode(type: NodeType): void
    {
        const node = new GraphNode(type);
        this.nodes.push(node);
    }

    render(): void
    {
        for (let node of this.nodes)
            node.render(this.camera);
    }
}