import { Graph } from '../lib/Graph'

describe('addNode', () => {
  it('should add a new node', () => {
    const graph = new Graph()
    const node = graph.addNode('add', 10, 10)

    expect(graph.findNode('add')).toBe(node)
  })
})
