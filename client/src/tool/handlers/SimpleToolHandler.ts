import { CanvasType } from "@/types/canvas";
import { getRelativePos } from "@/utils/tools";
import Tool from "../main/Tool";

export default class SimpleToolHandler extends Tool {
  mouseDown = false;
  x = 0;
  y = 0;

  constructor(canvas: CanvasType) {
    super(canvas);
    this.listen();
  }

  private listen() {
    if (this.canvas) {
      this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    }
  }

  private mouseDownHandler(e: MouseEvent) {
    this.mouseDown = true;

    if (this.ctx) {
      this.ctx.beginPath();
      const { x, y } = getRelativePos(e);
      this.ctx.moveTo(x, y);
    }
  }
}
