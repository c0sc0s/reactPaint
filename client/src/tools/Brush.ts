import canvasState from "../store/canvasState";
import { getRelativePos } from "../utils/utils";
import Tool from "./Tool";

export default class Brush extends Tool {
  private mouseDown;

  constructor(canvas, socket, id) {
    super(canvas, socket, id);
    this.listen();
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    this.canvas.onmousedown = this.mouseDownHandler.bind(this);
    this.canvas.onmouseup = this.mouseUpHandler.bind(this);
  }

  static draw(ctx, x, y) {
    ctx.lineTo(x, y);
    ctx.stroke();
  }

  mouseUpHandler(e) {
    this.mouseDown = false;
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
    this.ctx.moveTo(x, y);
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      const { x, y } = getRelativePos(e);
      this.socket.send(
        JSON.stringify({
          type: "draw",
          id: canvasState.sessionid,
          figure: {
            type: "brush",
            x,
            y,
          },
        })
      );
    }
  }
}
