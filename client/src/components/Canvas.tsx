import { observer } from "mobx-react-lite";
import { useEffect, useRef } from "react";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import "../styles/canvas.scss";
import Brush from "../tools/Brush";

const Canvas = observer(() => {
  const canvasRef: any = useRef();
  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
  }, []);

  const mouseDownHandler = () => {
    if (toolState.tool) canvasState.pushToUodo(canvasRef.current.toDataURL());
  };

  return (
    <div className="canvas">
      <canvas
        onMouseDown={() => mouseDownHandler()}
        ref={canvasRef as any}
        width={800}
        height={600}
      ></canvas>
    </div>
  );
});

export default Canvas;
