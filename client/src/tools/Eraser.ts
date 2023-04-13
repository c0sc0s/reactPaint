import Brush from "./Brush";

export default class Eraser extends Brush {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(canvas, socket, id) {
    super(canvas, socket, id);
  }
  draw(x, y) {
    this.ctx.strokeStyle = "#ffffff";
    this.ctx.lineWidth = 10;
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }
}
