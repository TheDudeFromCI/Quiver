import { Camera } from "./camera";
import { Connection } from "./connection";
import { GraphNode } from "./node";
import { NodeType } from "./nodetype";

export class NodeHandler
{
    private readonly camera: Camera;
    private readonly nodes: GraphNode[] = [];
    private readonly connections: Connection[] = [];

    constructor(camera: Camera)
    {
        this.camera = camera;
    }

    addNode(type: NodeType): GraphNode
    {
        const node = new GraphNode(type);
        this.nodes.push(node);
        return node;
    }

    addConnection(nodeA: GraphNode, nodeB: GraphNode, plugA: number, plugB: number): Connection
    {
        const connection = new Connection(nodeA, nodeB, plugA, plugB);
        this.connections.push(connection);
        return connection;
    }

    render(): void
    {
        for (let connection of this.connections)
            connection.render(this.camera);

        for (let node of this.nodes)
            node.render(this.camera);
    }
}