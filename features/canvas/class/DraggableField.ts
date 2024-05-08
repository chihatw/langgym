import { Field } from './Field';

export class DraggableField extends Field {
  setCanvas(canvas: HTMLCanvasElement) {
    super.setCanvas(canvas);

    // Event Listeners
    canvas.addEventListener('mousemove', (e) => {
      const { offsetX: x, offsetY: y } = e;
      for (let obj of super.objs) {
        obj.getMousePos(x, y);
      }
    });

    canvas.addEventListener('mousedown', (e) => {
      const { offsetX: x, offsetY: y } = e;
      for (let obj of super.objs) {
        obj.grab(x, y);
      }
    });

    canvas.addEventListener('mouseup', (e) => {
      for (let obj of super.objs) {
        obj.ungrab();
      }
    });
  }
}
