import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { useParams } from "react-router-dom";
import canvasState from "../store/canvasState";
import toolState from "../store/toolState";
import "../styles/canvas.scss";
import Brush from "../tools/Brush";

const Canvas = observer(() => {
  const canvasRef: any = useRef();
  const usernameRef: any = useRef();
  const PORT = process.env.PORT || 8080;
  const { id } = useParams() as any;

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
  }, []);

  useEffect(() => {
    if (canvasState.username) {
      const socket = new WebSocket(`ws://localhost:${PORT}`);
      canvasState.setSoket(socket);
      canvasState.setSessionId(id);
      toolState.setTool(new Brush(canvasRef.current, socket, id));
      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            id,
            username: canvasState.username,
            type: "connection",
          })
        );
      };
      socket.onmessage = (e) => {
        let msg = JSON.parse(e.data);
        switch (msg.type) {
          case "connection":
            console.log("链接成功");
            break;
          case "draw":
            drawHandler(msg);
            break;
        }
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [canvasState.username]);

  const drawHandler = ({ figure }) => {
    const ctx = canvasState.canvas.getContext("2d");
    switch (figure.type) {
      case "brush":
        Brush.draw(ctx, figure.x, figure.y);
    }
  };

  const [modal, setModal] = useState(true);

  const mouseDownHandler = () => {
    if (toolState.tool) canvasState.pushToUodo(canvasRef.current.toDataURL());
  };

  const connectHandler = () => {
    canvasState.setUsername(usernameRef.current.value);
    setModal(false);
  };

  return (
    <div className="canvas">
      <Modal show={modal} onHide={() => {}}>
        <Modal.Header closeButton>
          <Modal.Title>请输入你的名字 </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input ref={usernameRef}></input>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => {
              connectHandler();
            }}
          >
            确认
          </Button>
        </Modal.Footer>
      </Modal>
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
