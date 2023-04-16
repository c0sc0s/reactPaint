import { CanvasType } from "@/types/canvas";
import { ToolNames } from "@/types/tools";

export default class Tool {
  public canvas: CanvasType;
  public ctx: CanvasRenderingContext2D | null | undefined;
  public socket: WebSocket | null;
  public name = ToolNames.EMPTY;
  public saved = "";
  public sessionId: string;

  constructor(canvas: CanvasType, socket: WebSocket | null, sessionId: string) {
    this.canvas = canvas;
    this.socket = socket;
    this.sessionId = sessionId;
    this.ctx = canvas?.getContext("2d");

    if (this.ctx) {
    }
  }
}
