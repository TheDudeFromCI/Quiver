import { Camera } from "./camera";
import { Connection } from "./connection";
import { GraphNode } from "./node";
import { NodeType } from "./nodetype";

export class NodeHandler
{
    private readonly camera: Camera;
    private readonly nodes: GraphNode[] = [];
    private readonly connections: Connection[] = [];
    private _needsRepaint: boolean = false;

    constructor(camera: Camera)
    {
        this.camera = camera;
    }

    get needsRepaint(): boolean
    {
        return this._needsRepaint;
    }

    markRepainted(): void
    {
        this._needsRepaint = false;
    }

    addNode(type: NodeType): GraphNode
    {
        const node = new GraphNode(type);
        this.nodes.push(node);
        this._needsRepaint = true;
        return node;
    }

    addConnection(nodeA: GraphNode, nodeB: GraphNode, plugA: number, plugB: number): Connection
    {
        const connection = new Connection(nodeA, nodeB, plugA, plugB);
        this.connections.push(connection);
        this._needsRepaint = true;
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