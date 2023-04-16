import { MutableRefObject, useEffect, useRef } from "react";
import styles from "./Canvas.module.scss";

function index() {
  const canvasRef = useRef<HTMLCanvasElement>(
    null
  ) as MutableRefObject<HTMLCanvasElement>;

  const canvasWrapperRef = useRef<HTMLDivElement>(
    null
  ) as MutableRefObject<HTMLDivElement>;

  let canvasResizeTimer: NodeJS.Timeout;

  useEffect(() => {
    window.addEventListener("resize", resizeCanvasHandler);
    canvasRef.current.width = canvasWrapperRef.current.offsetWidth;
    canvasRef.current.height = canvasWrapperRef.current.offsetHeight;

    return () => {
      window.removeEventListener("resize", resizeCanvasHandler);
    };
  }, []);

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

      // CanvasState.setCanvasScaleFactor(scaleFactor);
      // Tool.calcScaleFactor(scaleFactor, toolState.cachedScaleFactor);
      // ctx?.clearRect(0, 0, canvasWidth, canvasHeight);
      // ctx?.drawImage(newImage, 0, 0, newWidth, newHeight);
    };
  };

  const resizeCanvasHandler = () => {
    const imageLink = canvasRef.current.toDataURL();

    clearTimeout(canvasResizeTimer);
    canvasResizeTimer = setTimeout(() => resizeCanvasAction(imageLink), 100);
  };

  return (
    <>
      <div ref={canvasWrapperRef} className={styles.canvas}>
        <canvas ref={canvasRef} className={styles.canvas__inner} />
      </div>
    </>
  );
}

export default index;
