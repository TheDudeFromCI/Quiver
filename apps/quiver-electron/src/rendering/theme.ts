/*
 * The theme class is used to determine how the graph should look and feel.
 */
export const Theme = {

  /**
     * How smooth to make camera panning and zooming. Smaller values are more
     * responsive but jittery, while larger values are slower and smoother.
     */
  CAMERA_SMOOTHING: 0.08,

  /**
     * The fillstyle for the background. Note, using transparent colors has
     * been known to sometimes ignore mouse events and pass events to under
     * lying elements.
     */
  BACKGROUND_COLOR: '#121212',

  /**
     * Whether or not grids should be drawn on the background.
     */
  DRAW_GRID: true,

  /**
     * The color of the grid to render.
     */
  GRID_COLOR: '#242424',

  /**
     * The color of major grid segments to render.
     */
  GRID_MAJOR_COLOR: '#363636',

  /**
     * The size of the grid to use when moving nodes. Nodes are snapped to
     * the nearest grid block. When set to 0, the grid is disabled.
     */
  GRID_SIZE: 50,

  /**
     * The number of grid segements before rendering it as a major grid line.
     * If set to 0, major grid segments are disabled. These have no effect,
     * and are visual only. These do not render if gridSize is set to 0.
     */
  GRID_MAJOR_SEGMENTS: 4,

  /**
     * The maximum amount the user is able to zoom in. Multiplier of default
     * zoom level.
     */
  MAX_ZOOM_IN: 3,

  /**
     * The maximum amount the user is able to zoom out. Multiplier of default
     * zoom level.
     */
  MAX_ZOOM_OUT: 0.25,

  /**
     * How much to change the zoom when the user 'clicks' the mouse wheel
     * by 1 unit.
     */
  ZOOM_DELTA: 0.92,

  /**
     * How much weight does one mouse wheel unit apply to the zoom level.
     */
  MOUSE_WHEEL_WEIGHT: 1 / 60,

  /**
     * The width of a node in pixels at the default zoom level.
     */
  NODE_WIDTH: 100,

  /**
     * The height of a plug on a node in pixels at the default zoom level.
     */
  NODE_PLUG_HEIGHT: 20,

  /**
     * The background color of nodes.
     */
  NODE_COLOR: '#777777',

  /**
     * The color of node borders when they are selected.
     */
  NODE_SELECTED_COLOR: '#FFFF00',

  /**
     * The color of text on nodes.
     */
  NODE_TEXT_COLOR: '#cccccc',

  /**
     * The amount of space in pixels at the default zoom level to allocate for
     * rendering the plug on a node.
     */
  PLUG_SIZE: 9,

  /**
     * How much space to place between the plug text and the edge of the node,
     * in pixels at the default zoom level.
     */
  PLUG_BUFFER_SIZE: 15,

  /**
     * The color of plugs.
     */
  PLUG_COLOR: '#444444',

  /**
     * The width of each window within the context menu in screen-space pixels.
     */
  CONTEXT_WINDOW_WIDTH: 150,

  /**
     * The height of a line of text within the context menu in screen-space
     * pixels.
     */
  CONTEXT_WINDOW_LINE_HEIGHT: 25,

  /**
     * The background color of the context menu.
     */
  CONTEXT_MENU_COLOR: '#050505',

  /**
     * The background color of selected elements within the context menu.
     */
  CONTEXT_MENU_SELECTED_COLOR: '#333333',

  /**
     * The color of text within the context menu.
     */
  CONTEXT_MENU_TEXT_COLOR: '#999999',

  /**
     * The color of connection lines between nodes.
     */
  CONNECTION_COLOR: '#999900',

  /**
     * How thick to render the connection lines, in pixels.
     */
  CONNECTION_THICKNESS: 3
}
