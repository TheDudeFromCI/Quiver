import { Graph } from "./graph";
import $ from 'jquery';

function main()
{
    const canvas = document.getElementById('node-canvas') as HTMLCanvasElement;
    if (canvas == null)
        throw new Error('Failed to find canvas element!');

    const graph = new Graph(canvas);
    graph.start();
}

$(main)