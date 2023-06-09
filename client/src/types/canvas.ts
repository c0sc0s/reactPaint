import { ToolType } from "./tools";
import { UserType } from "./user";

export type CanvasType = HTMLCanvasElement | null;

export enum CanvasWSMethods {
  CONNECT = "connection",
  DISCONNECT = "disconnect",
  DRAW = "draw",
  CLEAR = "clear",
  UNDO = "undo",
  REDO = "redo",
  RELEASE_FIGURE = "release_figure",
}

export interface MessageType {
  method: CanvasWSMethods;
  username: string;
  id: string;
  figure: ToolType;
  users?: UserType[];
}
