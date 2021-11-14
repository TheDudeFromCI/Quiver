import { Graph } from "./graph";
import $ from 'jquery';
import { Plug } from "./plug";
import { NodeType } from "./nodetype";

function main(): void
{
    const canvas = document.getElementById('node-canvas') as HTMLCanvasElement;
    if (canvas == null)
        throw new Error('Failed to find canvas element!');

    const graph = new Graph(canvas);

    //@ts-ignore
    globalThis['graph'] = graph;

    graph.contextMenu.addOption('this/is/sparta');
    graph.contextMenu.addOption('this/is/my/menu');
    graph.nodeHandler.addNode(new NodeType('Add', [new Plug('A', 'number'), new Plug('B', 'number')], [new Plug('A+B', 'number')]));

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

$(main)