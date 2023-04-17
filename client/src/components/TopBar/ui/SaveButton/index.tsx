import canvasState from "@/store/canvasState";
import { Button, Icon, Modal, TextField } from "@mui/material";
import { FC, useEffect, useState } from "react";
import styles from "./SaveButton.module.scss";

const SaveButton: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [filename, setFilename] = useState("");

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  });

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.ctrlKey && e.code === "keyS") {
      e.preventDefault();
      openModal();
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const saveCanvas = () => {
    if (canvasState.canvas) {
      const dataUrl = canvasState.canvas.toDataURL("image/png");
      const currentFilename = filename ? filename : canvasState.sessionId;
      const a = document.createElement("a");
      a.href = dataUrl;
      a.download = currentFilename + ".png";
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      closeModal();
    }
  };

  return (
    <>
      <Button aria-label="Сохранить" title="保存文件" onClick={openModal}>
        <Icon>save</Icon>
      </Button>

      <Modal open={isModalOpen} onClose={closeModal}>
        <div className={styles.saveModal}>
          <h2 className={styles.saveModal__title}>保存文件</h2>
          <div className={styles.saveModal__inputBlock}>
            <TextField
              type="text"
              id="nameInput"
              placeholder="filename"
              label="filename"
              variant="outlined"
              value={filename}
              onChange={(e) => setFilename(e.target.value)}
              className={styles.saveModal__nameInput}
            />
          </div>
          <div className={styles.saveModal__buttonBlock}>
            <Button
              onClick={saveCanvas}
              variant="outlined"
              color="primary"
              className={styles.saveModal__btn}
            >
              保存
            </Button>
            <Button
              onClick={closeModal}
              variant="outlined"
              color="error"
              className={styles.saveModal__btn}
            >
              取消
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
};
export default SaveButton;
