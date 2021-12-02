import { Graph } from './graph/graph'
import { ContextMenuAction } from './graph/contextmenu'
import { Position } from './graph/position'
import { Library, NodeType } from './graph/libraryhandler'
import sampleLibrary from './sample-library.json'

function main (): void {
  const canvas = document.getElementById('node-canvas') as HTMLCanvasElement
  if (canvas == null) { throw new Error('Failed to find canvas element!') }

  const graph = new Graph(canvas)

  // @ts-expect-error
  globalThis.graph = graph

  function addNode (type: NodeType): ContextMenuAction {
    return (mousePos: Position) => {
      const n = graph.nodeHandler.addNode(type)
      n.pos.set(mousePos.x, mousePos.y)
      graph.camera.screenToWorld(n.pos)
      n.pos.x -= n.width / 2
      n.pos.y -= n.height / 2
    }
  }

  const library = Library.load(sampleLibrary)
  for (const nodeType of library.nodeTypes) {
    const path = nodeType.namespace + '/' + nodeType.namespace
    graph.contextMenu.addOption(path, addNode(nodeType))
  }

  let lastFrame = 0
  function mainLoop (time: number): void {
    requestAnimationFrame(mainLoop)

    const delta = (time - lastFrame) / 1000.0
    if (delta < 1 / 60) return // Limit to 60 fps
    lastFrame = time

    graph.update(delta)
    graph.render()
  }

  requestAnimationFrame(mainLoop)
}

window.addEventListener('DOMContentLoaded', main)
