export const RECT = { width: 512, height: 320 };

export const FONT_SIZE = 14;
export const FONT_FAMILY = 'sans-serif';

export const CANVAS_COLOR = 'rgba(255,255,255,0.6)';
export const BG_COLOR = '#eeeeee';
export const TEXT_COLOR = 'rgba(0,0,0,0.8)';
export const HIGHLIGHT_TEXT_COLOR = 'red';

export const BOX_SELECTED_COLOR = 'rgba(255,0,0,0.3)';

export const DIVIDER_COLOR = 'rgba(0,0,0,0.6)';
export const DIVIDER_WIDTH = 1.5;
export const DIVIDER_DASH = [8, 4];
export const DIVIDER_GAP = 16;

export const BOX_MIN_WIDTH = FONT_SIZE * 6;
export const BOX_GAP = FONT_SIZE * 2;
export const BOX_HEIGHT = FONT_SIZE * 2;
export const BOX_X_PADDING = FONT_SIZE;

export const REDRAW = {
  select: 'select',
  add: 'add',
  delete: 'delete',
  grab: 'grab',
  ungrab: 'ungrab',
  dragging: 'dragging',
  divide: 'divide',
  split: 'split',
  expand: 'expand',
  completeExpand: 'completeExpand',
  connect: 'connect',
  highlight: 'highlight',
  dehighlight: 'dehighlight',
};

export const MODE = {
  new: 'new',
  shift: 'shift',
  highlight: 'highlight',
};

export const INITIAL_MODE = MODE.new;

export const SEGMENT = {
  header: 'header',
  body: 'body',
  handle: 'handle',
};

export const SHORT_CUT_KEY = {
  q: 'q',
  w: 'w',
  e: 'e',
  r: 'r',
  t: 't',

  a: 'a',
  s: 's',
  d: 'd',
  highlight: 'f',
  g: 'g',

  z: 'z',
  x: 'x',
  c: 'c',
  v: 'v',
};

export const ARROW_STROKE_WIDTH = 4;
export const ARROW_LENGTH = 12;
export const ARROW_WIDTH = 9;
export const ARROW_MARGIN = 8;
