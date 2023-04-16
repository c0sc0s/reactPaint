import canvasState from "@/store/canvasState";
import toolState from "@/store/toolState";
import { CanvasType } from "@/types/canvas";
import { FigureType, ToolNames, ToolType } from "@/types/tools";
import { getRelativePos } from "@/utils/tools";
import { drawSend } from "@/ws/senders";
import { toast } from "react-hot-toast";
import Tool from "../main/Tool";

export default class SimpleToolHandler extends Tool {
  mouseDown = false;
  x = 0;
  y = 0;
  private oldX = 0;
  private oldY = 0;

  public setCurrentProps: (() => ToolType) | null = null;
  public localDrawFunc: (() => void) | null = null;

  constructor(canvas: CanvasType, socket: WebSocket | null, sessionId: string) {
    super(canvas, socket, sessionId);
    this.listen();
  }

  public listen() {
    if (this.canvas) {
      this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
      this.canvas.onmousedown = this.mouseDownHandler.bind(this);
      this.canvas.onmouseup = this.stopDrawingHandler.bind(this);

      this.canvas.ontouchmove = this.touchMoveHandler.bind(this);
      this.canvas.ontouchstart = this.touchStartHandler.bind(this);
      this.canvas.ontouchend = this.stopDrawingHandler.bind(this);
    }
  }

  public mouseDownHandler(e: MouseEvent) {
    this.mouseDown = true;

    if (e.shiftKey) {
      const target = e.target as HTMLCanvasElement;
      this.oldX = e.pageX - target?.offsetLeft;
      this.oldY = e.pageY - target?.offsetTop;
    }

    if (this.ctx) {
      this.ctx.lineWidth = toolState.lineWidth;
      this.ctx.fillStyle = toolState.fillColor;
      this.ctx.strokeStyle = toolState.strokeColor;
      this.ctx.beginPath();
      const { x, y } = getRelativePos(e);
      this.ctx.moveTo(x, y);
    }
  }

  public mouseMoveHandler(e: MouseEvent) {
    const target = e.target as HTMLCanvasElement;
    const { x, y } = getRelativePos(e);
    this.x = x;
    this.y = y;

    if (e.shiftKey && this.mouseDown) {
      const deltaY = Math.abs(this.y - this.oldY);
      const deltaX = Math.abs(this.x - this.oldX);

      deltaY > 0 && deltaY > deltaX
        ? (this.x = this.oldX)
        : (this.y = this.oldY);
    }
    this.drawingHandler();
  }

  private drawingHandler() {
    if (this.mouseDown) {
      if (this.localDrawFunc) {
        this.localDrawFunc();
      } else {
        toast.error("localDrawFunc is not defined");
      }

      if (this.setCurrentProps) {
        const currentProps = this.setCurrentProps();
        const figure: ToolType = {
          ...currentProps,
          scaleFactor: canvasState.canvasScaleFactor,
          lineWidth: toolState.lineWidth,
          strokeColor: toolState.strokeColor,
        };
        drawSend(figure);
      }
    }
  }

  private stopDrawingHandler() {
    this.mouseDown = false;
    this.ctx?.beginPath();

    drawSend({
      type: ToolNames.EMPTY,
    });
  }

  private touchStartHandler(e: TouchEvent) {
    e.preventDefault();
    const target = e.target as HTMLCanvasElement;
    this.mouseDown = true;
    const pageX = e.touches[0].pageX;
    const pageY = e.touches[0].pageY;

    if (this.ctx) {
      this.ctx.lineWidth = toolState.lineWidth;
      this.ctx.fillStyle = toolState.fillColor;
      this.ctx.strokeStyle = toolState.strokeColor;
      this.ctx?.beginPath();
      this.ctx?.moveTo(pageX - target.offsetLeft, pageY - target.offsetTop);
    }
  }

  private touchMoveHandler(e: TouchEvent) {
    e.preventDefault();
    const target = e.target as HTMLCanvasElement;
    const pageX = e.touches[0].pageX;
    const pageY = e.touches[0].pageY;
    this.x = pageX - target.offsetLeft;
    this.y = pageY - target.offsetTop;

    this.drawingHandler();
  }

  //todo: refactor
  public static onlineDraw(
    ctx: CanvasRenderingContext2D,
    figure: FigureType,
    drawFunc: (ctx: CanvasRenderingContext2D, figure: FigureType) => void
  ) {
    super.setDrawStyle(ctx, figure);
    drawFunc(ctx, figure);

    ctx.stroke();
  }
}
