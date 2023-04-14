import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import { getRelativePos } from "../utils/utils";
import Tool from "./Tool";

export default class Rect extends Tool {
  private mouseDown;
  private startX;
  private startY;
  private width;
  private height;
  private saved;

  constructor(canvas, socket, id) {
    super(canvas, socket, id);
    this.listen();
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  draw(x, y, w, h) {
    const img = new Image();
    img.src = this.saved;
    const canvasWidth = this.canvas.width;
    const canvasHeight = this.canvas.height;
    img.onload = () => {
      this.ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      this.ctx.drawImage(img, 0, 0, canvasWidth, canvasHeight);
      this.ctx.beginPath();
      this.ctx.rect(x, y, w, h);
      this.ctx.fill();
      this.ctx.stroke();
    };
  }

  static staticDraw(ctx, x, y, w, h, { fillColor, strokeColor, strokeWidth }) {
    fillColor && (ctx.fillStyle = fillColor);
    strokeColor && (ctx.strokeStyle = strokeColor);
    strokeWidth && (ctx.lineWidth = strokeWidth);
    ctx.beginPath();
    ctx.rect(x, y, w, h);
    ctx.fill();
    ctx.stroke();
  }

  mouseUpHandler(e) {
    this.mouseDown = false;
    const penInfo = {
      fillColor: this.ctx.fillColor,
      strokeColor: this.ctx.strokeColor,
      strokeWidth: this.ctx.strokeWidth,
    };
    this.socket.send(
      JSON.stringify({
        type: "draw",
        id: this.id,
        figure: {
          type: "rect",
          x: this.startX,
          y: this.startY,
          width: this.width,
          height: this.height,
          penInfo,
        },
      })
    );
    this.socket.send(
      JSON.stringify({
        type: "draw",
        id: this.id,
        figure: {
          type: "finish",
        },
      })
    );
  }

  mouseDownHandler(e) {
    this.mouseDown = true;
    this.ctx.beginPath();
    const { x, y } = getRelativePos(e);
    this.startX = x;
    this.startY = y;
    this.saved = this.canvas.toDataURL();
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      const { x, y } = getRelativePos(e);
      let currentX = x;
      let currentY = y;
      this.width = currentX - this.startX;
      this.height = currentY - this.startY;
      this.draw(this.startX, this.startY, this.width, this.height);
    }
  }
}
