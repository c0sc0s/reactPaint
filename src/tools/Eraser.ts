import Brush from "./Brush";

export default class Eraser extends Brush {
  draw(x, y) {
    this.ctx.strokeStyle = "#ffffff";
    this.ctx.lineWidth = 10;
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }
}
