import { CanvasType } from "@/types/canvas";

export default class Tool {
  public canvas: CanvasType;
  public ctx: CanvasRenderingContext2D | null | undefined;

  constructor(canvas: CanvasType) {
    this.canvas = canvas;
    this.ctx = canvas?.getContext("2d");
  }
}
