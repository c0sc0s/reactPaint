import { CanvasType } from "@/types/canvas";
import { makeAutoObservable } from "mobx";

class CanvasState {
  canvas: CanvasType = null;
  socket: WebSocket | null = null;
  sessionId = "";
  undoList: string[] = [];
  redoList: string[] = [];
  username = "";
  isAuth = false;
  canvasScaleFactor = 1;

  constructor() {
    makeAutoObservable(this);
  }

  public setCanvas(canvas: CanvasType) {
    this.canvas = canvas;
  }

  public setUsername(username: string) {
    this.username = username;
  }

  public setAuth(isAuth: boolean) {
    this.isAuth = isAuth;
  }

  public setSessionId(sessionId: string) {
    this.sessionId = sessionId;
  }

  public setSocket(socket: WebSocket) {
    this.socket = socket;
  }

  public addUndo(data: string) {
    this.undoList.push(data);
  }

  public addRedo(data: string) {
    this.redoList.push(data);
  }

  public requestUndo() {}
}
