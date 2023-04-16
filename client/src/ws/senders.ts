import canvasState from "@/store/canvasState";
import { CanvasWSMethods, MessageType } from "@/types/canvas";
import { ToolType } from "@/types/tools";
import { toast } from "react-hot-toast";

export const defaultSend = (method: CanvasWSMethods) => {
  if (!canvasState.socket || !canvasState.isAuth) {
    return toast.error("网络链接错误");
  }

  canvasState.socket.send(
    JSON.stringify({
      method,
      id: canvasState.sessionId,
      username: canvasState.username,
      figure: {},
    } as MessageType)
  );
};

export const drawSend = (propsFigure: ToolType) => {
  if (!canvasState.socket || !canvasState.isAuth) {
    return toast.error("网络链接错误");
  }
  canvasState.socket.send(
    JSON.stringify({
      method: CanvasWSMethods.DRAW,
      id: canvasState.sessionId,
      username: canvasState.username,
      figure: propsFigure,
    } as MessageType)
  );
};
