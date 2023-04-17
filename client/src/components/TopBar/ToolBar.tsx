import Button from "@mui/material/Button";
import { Icon } from "@mui/material";
import topbar from "./TopBar.module.scss";
import { observer } from "mobx-react-lite";
import { ChangeEvent, FC, useEffect } from "react";
import toolState from "@/store/toolState";
import canvasState from "@/store/canvasState";
import { Brush, Circle, Eraser, Line, Rect } from "@/tool";
import { ToolNames } from "@/types/tools";
import style from "./TopBar.module.scss";
import SaveButton from "./ui/SaveButton";

const ToolBar: FC = observer(() => {
  const currentToolName = toolState.currentToolName;
  useEffect(() => {
    console.log(currentToolName);
  });

  const { socket, sessionId } = canvasState;
  const changeColor = (e: ChangeEvent<HTMLInputElement>) => {
    const color = e.target.value;
    toolState.setFillColor(color);
  };

  return (
    <>
      <div className={topbar["top-bar"]}>
        <div className="left">
          <Button
            className={currentToolName === ToolNames.BRUSH ? style.active : ""}
            variant="text"
            onClick={() =>
              toolState.setTool(
                new Brush(canvasState.canvas, socket, sessionId)
              )
            }
          >
            <Icon>brush</Icon>
          </Button>

          <Button
            className={currentToolName === ToolNames.RECT ? style.active : ""}
            variant="text"
            onClick={() =>
              toolState.setTool(new Rect(canvasState.canvas, socket, sessionId))
            }
          >
            <Icon>square</Icon>
          </Button>
          <Button
            variant="text"
            className={currentToolName === ToolNames.CIRCLE ? style.active : ""}
            onClick={() =>
              toolState.setTool(
                new Circle(canvasState.canvas, socket, sessionId)
              )
            }
          >
            <Icon>circle</Icon>
          </Button>
          <Button
            variant="text"
            className={currentToolName === ToolNames.LINE ? style.active : ""}
            onClick={() =>
              toolState.setTool(new Line(canvasState.canvas, socket, sessionId))
            }
          >
            <Icon>polyline</Icon>
          </Button>
          <Button
            variant="text"
            className={currentToolName === ToolNames.ERASER ? style.active : ""}
            onClick={() =>
              toolState.setTool(
                new Eraser(canvasState.canvas, socket, sessionId)
              )
            }
          >
            <Icon>auto_fix_normal</Icon>
          </Button>
          <Button variant="text">
            <input
              className={topbar["color-set"]}
              type="color"
              onChange={(e) => changeColor(e)}
            />
          </Button>
        </div>
        <div className="right">
          <Button variant="text" onClick={() => canvasState.requestUndo()}>
            <Icon>undo</Icon>
          </Button>
          <Button variant="text" onClick={() => canvasState.requestRedo()}>
            <Icon>redo</Icon>
          </Button>
          <Button variant="text" onClick={() => canvasState.requestClear()}>
            <Icon>delete</Icon>
          </Button>
          <SaveButton></SaveButton>
        </div>
      </div>
    </>
  );
});

export default ToolBar;
