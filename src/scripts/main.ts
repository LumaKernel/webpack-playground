import { assert } from '@/lib/assert';

const canvas = document.querySelector('canvas');
assert(canvas !== null);

const supportHighResolution = (canvasElement: HTMLCanvasElement) => {
  /* eslint-disable no-param-reassign */
  const ctx = canvasElement.getContext('2d');
  if (!ctx) return;

  const CANVAS_WIDTH = parseFloat(canvasElement.getAttribute('width') ?? '0');
  const CANVAS_HEIGHT = parseFloat(canvasElement.getAttribute('height') ?? '0');

  const dpr = window.devicePixelRatio || 1;
  canvasElement.width = CANVAS_WIDTH * dpr;
  canvasElement.height = CANVAS_HEIGHT * dpr;
  ctx.scale(dpr, dpr);
  canvasElement.style.width = `${CANVAS_WIDTH}px`;
  canvasElement.style.height = `${CANVAS_HEIGHT}px`;
  /* eslint-enable no-param-reassign */
};

const draw = () => {
  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  supportHighResolution(canvas);

  ctx.strokeRect(50, 50, 50, 50);

  ctx.font = 'bold 48px Verdana';
  ctx.strokeText('Hello from Canvas', 100, 100);
};

draw();
