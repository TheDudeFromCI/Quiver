
import { Graph } from './rendering/graph/Graph'

function main (): void {
  const canvas = document.getElementById('node-canvas') as HTMLCanvasElement
  if (canvas == null) throw new Error('Failed to find canvas element!')

  const graph = new Graph(canvas)

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
