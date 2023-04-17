import { FC, MutableRefObject, useEffect, useRef, useState } from "react";
import styles from "./Canvas.module.scss";
import { observer } from "mobx-react-lite";
import { useParams } from "react-router";
import canvasState from "@/store/canvasState";
import { getImage, updateImage } from "@/apis/imageApi";
import { toast } from "react-hot-toast";
import toolState from "@/store/toolState";
import { Brush, Circle, Eraser, Line, Rect } from "@/tool";
import Tool from "@/tool/main/Tool";
import { CanvasWSMethods, MessageType } from "@/types/canvas";
import usersState from "@/store/userState";
import { ToolNames } from "@/types/tools";
import { defaultSend } from "@/ws/senders";
import { closeHandler, disconnectHandler, openHandler } from "@/ws/handlers";

const Canvas: FC = observer(() => {
  const [isImageLoading, setIsImageLoading] = useState(true);

  const canvasRef = useRef<HTMLCanvasElement>(
    null
  ) as MutableRefObject<HTMLCanvasElement>;

  const canvasWrapperRef = useRef<HTMLDivElement>(
    null
  ) as MutableRefObject<HTMLDivElement>;

  const { id } = useParams() as { id: string };
  const { username } = canvasState;

  let canvasResizeTimer: NodeJS.Timeout;

  const syncCanvas = async () => {
    try {
      const imageLink = await getImage(id);

      if (!imageLink) {
        canvasRef.current.width = canvasWrapperRef.current.offsetWidth;
        canvasRef.current.height = canvasWrapperRef.current.offsetHeight;
        return;
      }

      resizeCanvasAction(imageLink);
    } catch (e) {
      console.log(e);
      toast.error("网络错误");
    } finally {
      setIsImageLoading(false);
    }
  };

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    syncCanvas();
    window.addEventListener("resize", resizeCanvasHandler);
    canvasRef.current.width = canvasWrapperRef.current.offsetWidth;
    canvasRef.current.height = canvasWrapperRef.current.offsetHeight;

    return () => {
      document.removeEventListener("keypress", keyPressHandler);
      window.removeEventListener("beforeunload", disconnectHandler);
      window.removeEventListener("resize", resizeCanvasHandler);
    };
  }, []);

  useEffect(() => {
    if (username) {
      const socket = new WebSocket("ws://localhost:8080" as string);
      canvasState.setSocket(socket);
      canvasState.setSessionId(id);
      toolState.setTool(new Brush(canvasRef.current, socket, id));

      socket.addEventListener("open", openHandler);
      socket.addEventListener("message", socketMessageHandler);
      socket.addEventListener("close", closeHandler);

      return () => {
        socket.removeEventListener("open", openHandler);
        socket.removeEventListener("message", socketMessageHandler);
        socket.removeEventListener("close", closeHandler);
      };
    }
  }, [username]);

  const resizeCanvasAction = (imageLink: string) => {
    const canvas = canvasRef.current;
    const canvasWidth = canvasWrapperRef.current.offsetWidth || 400;
    const canvasHeight = canvasWrapperRef.current.offsetHeight || 400;

    const ctx = canvas.getContext("2d");

    const newImage = new Image();
    newImage.src = imageLink;

    newImage.onload = () => {
      const imageWidth = newImage.width;
      const imageHeight = newImage.height;
      const scaleFactor = Math.min(
        canvasWidth / imageWidth,
        canvasHeight / imageHeight
      );
      const newWidth = imageWidth * scaleFactor;
      const newHeight = imageHeight * scaleFactor;
      canvas.width = newWidth;
      canvas.height = newHeight;

      canvasState.setCanvasScaleFactor(scaleFactor);
      Tool.calcScaleFactor(scaleFactor, toolState.cachedScaleFactor);
      ctx?.clearRect(0, 0, canvasWidth, canvasHeight);
      ctx?.drawImage(newImage, 0, 0, newWidth, newHeight);
    };
  };

  const resizeCanvasHandler = () => {
    const imageLink = canvasRef.current.toDataURL();

    clearTimeout(canvasResizeTimer);
    canvasResizeTimer = setTimeout(() => resizeCanvasAction(imageLink), 100);
  };

  const drawHandler = (msg: MessageType) => {
    const figure = msg.figure;
    const ctx = canvasRef.current?.getContext("2d");
    const isMyFigure = msg.username === canvasState.username;

    if (ctx && !isMyFigure) {
      switch (figure.type) {
        case ToolNames.BRUSH:
          Brush.draw(ctx, figure);
          break;
        case ToolNames.RECT:
          Rect.draw(ctx, figure);
          break;
        case ToolNames.CIRCLE:
          Circle.draw(ctx, figure);
          break;
        case ToolNames.LINE:
          Line.draw(ctx, figure);
          break;
        case ToolNames.ERASER:
          Eraser.draw(ctx, figure);
          break;
        case ToolNames.EMPTY:
          ctx.beginPath();
          break;
      }
    }
  };

  const socketMessageHandler = (msg: MessageEvent) => {
    const parsedMsg: MessageType = JSON.parse(msg.data);

    switch (parsedMsg.method) {
      case CanvasWSMethods.CONNECT:
        if (parsedMsg.username !== canvasState.username) {
          usersState.addUser({
            id: parsedMsg.id,
            username: parsedMsg.username,
          });
          toast.success(`欢迎 ${parsedMsg.username} 连接`);
        }
        break;
      case CanvasWSMethods.DRAW:
        drawHandler(parsedMsg);
        break;
      case CanvasWSMethods.RELEASE_FIGURE:
        canvasState.addUndo(canvasRef.current.toDataURL());
        break;
      case CanvasWSMethods.UNDO:
        canvasState.undo();
        break;
      case CanvasWSMethods.REDO:
        canvasState.redo();
        break;
      case CanvasWSMethods.CLEAR:
        canvasState.clearCanvas();
        break;
      case CanvasWSMethods.DISCONNECT:
        if (parsedMsg.username !== canvasState.username) {
          usersState.removeUser({
            id: parsedMsg.id,
            username: parsedMsg.username,
          });
          toast.error(`Пользователь ${parsedMsg.username} отключился`);
        }
    }
  };

  const keyPressHandler = (e: KeyboardEvent) => {
    switch (e.ctrlKey && e.code) {
      case "KeyZ":
        canvasState.requestUndo();
        break;
      case "KeyY":
        canvasState.requestRedo();
        break;
    }
  };

  const mouseDownHandler = () => {
    defaultSend(CanvasWSMethods.RELEASE_FIGURE);
  };

  const mouseUpHandler = async () => {
    if (canvasRef.current) {
      await updateImage(id, canvasRef.current.toDataURL());
    }
  };

  return (
    <>
      <div ref={canvasWrapperRef} className={styles.canvas}>
        <canvas ref={canvasRef} className={styles.canvas__inner} />
      </div>
    </>
  );
});

export default Canvas;
