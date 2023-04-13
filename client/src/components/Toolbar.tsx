import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import "../styles/toolbar.scss";
import Brush from "../tools/Brush";
import Circle from "../tools/Circle";
import Eraser from "../tools/Eraser";
import Line from "../tools/Line";
import Rect from "../tools/Rect";

export default function Toolbar() {
  const changeColor = (color) => {
    toolState.setFillColor(color);
    toolState.setStrokeColor(color);
  };

  return (
    <div className="toolbar">
      <button
        className="toolbar-btn brush"
        onClick={() => toolState.setTool(new Brush(canvasState.canvas))}
      />
      <button
        className="toolbar-btn rect"
        onClick={() => toolState.setTool(new Rect(canvasState.canvas))}
      />
      <button
        className="toolbar-btn circle"
        onClick={() => toolState.setTool(new Circle(canvasState.canvas))}
      />
      <button
        className="toolbar-btn eraser"
        onClick={() => toolState.setTool(new Eraser(canvasState.canvas))}
      />
      <button
        className="toolbar-btn line"
        onClick={() => {
          toolState.setTool(new Line(canvasState.canvas));
        }}
      />
      <input
        onChange={(e) => changeColor(e.target.value)}
        className="color"
        type="color"
      />
      <button className="toolbar-btn undo" onClick={() => canvasState.undo()} />
      <button className="toolbar-btn redo" onClick={() => canvasState.redo()} />
      <button className="toolbar-btn save" />
    </div>
  );
}
