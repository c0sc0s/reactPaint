import Tool from "@/tool/main/Tool";
import { makeAutoObservable } from "mobx";

class TooState {
  tool: Tool | null = null;
  toolScaleFactor = 1;
  strokeColor = "#000";
  fillColor = "#000";
  lineWidth = 1;
  cachedScaleFactor = 0;

  constructor() {
    makeAutoObservable(this);
  }

  public setTool(tool: Tool) {
    this.tool = tool;
  }

  public setFillColor(color: string) {
    if (this.tool) {
      this.fillColor = color;
      this.tool.fillColor = color;
    }
  }
}
