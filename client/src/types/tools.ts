export enum ToolNames {
  BRUSH = "BRUSH",
  ERASER = "ERASER",
  LINE = "LINE",
  RECT = "RECT",
  CIRCLE = "CIRCLE",
  EMPTY = "",
}

export interface FigureType {
  type: ToolNames;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface RectType extends FigureType {
  type: ToolNames.RECT;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface CircleType extends FigureType {
  type: ToolNames.CIRCLE;
  x: number;
  y: number;
  radiusX: number;
  radiusY: number;
}

export interface LineType extends FigureType {
  type: ToolNames.LINE;
  x: number;
  y: number;
  startX: number;
  startY: number;
}

export interface BrushType extends FigureType {
  type: ToolNames.BRUSH;
  x: number;
  y: number;
}

export interface EraserType extends FigureType {
  type: ToolNames.ERASER;
  x: number;
  y: number;
}

export interface EmptyToolType extends FigureType {
  type: ToolNames.EMPTY;
}

export type ToolType =
  | RectType
  | CircleType
  | LineType
  | BrushType
  | EraserType
  | EmptyToolType;
