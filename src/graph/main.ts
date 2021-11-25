import { Graph } from "./graph";
import { Plug } from "./plug";
import { NodeType } from "./nodetype";
import { ContextMenuAction } from "./contextmenu";
import { Position } from "./position";

function main(): void
{
    const canvas = document.getElementById('node-canvas') as HTMLCanvasElement;
    if (canvas == null)
        throw new Error('Failed to find canvas element!');

    const graph = new Graph(canvas);

    //@ts-ignore
    globalThis['graph'] = graph;

    function addNode(type: NodeType): ContextMenuAction
    {
        return (mousePos: Position) =>
        {
            const n = graph.nodeHandler.addNode(type);
            n.pos.set(mousePos.x, mousePos.y);
            graph.camera.screenToWorld(n.pos);
            n.pos.x -= n.width / 2;
            n.pos.y -= n.height / 2;
        }
    }

    const add = new NodeType('Add', [new Plug('A', 'number'), new Plug('B', 'number')], [new Plug('A+B', 'number')]);
    const subtract = new NodeType('Subtract', [new Plug('A', 'number'), new Plug('B', 'number')], [new Plug('A+B', 'number')]);

    graph.contextMenu.addOption('math/add', addNode(add));
    graph.contextMenu.addOption('math/subtract', addNode(subtract));

    let lastFrame = 0;
    function mainLoop(time: number): void
    {
        requestAnimationFrame(mainLoop);

        const delta = (time - lastFrame) / 1000.0;
        if (delta < 1 / 60) return; // Limit to 60 fps
        lastFrame = time;

        graph.update(delta);
        graph.render();
    }

    requestAnimationFrame(mainLoop);
}

window.addEventListener('DOMContentLoaded', main);