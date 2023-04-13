import { getRelativePos } from "../utils/utils";
import Tool from "./Tool";

export default class Circle extends Tool {
  private mouseDown;
  private saved;
  private startX;
  private startY;
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
    const img = new Image();
    img.src = this.saved;
    img.onload = () => {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      this.ctx.beginPath();

      let r = Math.sqrt(
        Math.pow(x - this.startX, 2) + Math.pow(y - this.startY, 2)
      );

      this.ctx.moveTo(this.startX, this.startY);
      this.ctx.arc(this.startX, this.startY, r, 0, 2 * Math.PI);
      this.ctx.fill();
      this.ctx.stroke();
    };
  }

  mouseUpHandler(e) {
    this.mouseDown = false;
  }

  mouseDownHandler(e) {
    this.mouseDown = true;
    const { x, y } = getRelativePos(e);
    this.startX = x;
    this.startY = y;
    this.saved = this.canvas.toDataURL();
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      const { x, y } = getRelativePos(e);
      this.draw(x, y);
    }
  }
}
