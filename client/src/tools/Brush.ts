import { getRelativePos } from "../utils/utils";
import Tool from "./Tool";

export default class Brush extends Tool {
  private mouseDown;

  constructor(canvas) {
    super(canvas);
    this.listen();
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  draw(x, y) {
    this.ctx.lineTo(x, y);
    this.ctx.stroke();
  }

  mouseUpHandler(e) {
    this.mouseDown = false;
  }

  mouseDownHandler(e) {
    this.mouseDown = true;
    this.ctx.beginPath();
    const { x, y } = getRelativePos(e);
    this.ctx.moveTo(x, y);
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      const { x, y } = getRelativePos(e);
      this.draw(x, y);
    }
  }
}
