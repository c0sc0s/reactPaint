import { makeAutoObservable } from "mobx";
import { clearSreen } from "../utils/utils";

class CanvasState {
  canvas = null;
  undoList = [];
  redoList = [];
  constructor() {
    makeAutoObservable(this);
  }
  setCanvas(canvas: any) {
    this.canvas = canvas;
  }

  pushToUodo(data) {
    this.undoList.push(data);
  }

  pushToRedo(data) {
    this.redoList.push(data);
  }

  undo() {
    const ctx = this.canvas.getContext("2d");
    if (this.undoList.length) {
      const data = this.undoList.pop();
      this.pushToRedo(this.canvas.toDataURL());
      const img = new Image();
      img.src = data;
      img.onload = () => {
        clearSreen(ctx, this.canvas);
        ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        console.log("1");
      };
    }
  }

  redo() {
    const ctx = this.canvas.getContext("2d");
    if (this.redoList.length) {
      const data = this.redoList.pop();
      this.pushToUodo(this.canvas.toDataURL());
      const img = new Image();
      img.src = data;
      img.onload = () => {
        clearSreen(ctx, this.canvas);
        ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
        console.log("2");
      };
    }
  }
}

const canvasState = new CanvasState();
export default canvasState;
