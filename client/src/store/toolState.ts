import { makeAutoObservable } from "mobx";

class ToolState {
  tool = null;
  strokeColor;
  fillColor;
  constructor() {
    makeAutoObservable(this);
  }
  setTool(tool: any) {
    this.tool = tool;
    this.strokeColor && this.setStrokeColor(this.strokeColor);
    this.fillColor && this.setFillColor(this.fillColor);
  }
  setFillColor(color) {
    this.fillColor = color;
    this.tool && (this.tool.fillColor = this.fillColor);
  }
  setStrokeColor(color) {
    this.strokeColor = color;
    this.tool && (this.tool.strokeColor = this.strokeColor);
  }
  setLineWidth(width) {
    this.tool.lineWidth = width;
  }
}

const toolState = new ToolState();
export default toolState;
