import canvasState from "@/store/canvasState";
import { Button, Icon } from "@mui/material";
import { FC, useState } from "react";
import styles from "./ShareButton.module.scss";
import { toast } from "react-hot-toast";

const ShareButton: FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIdCopied, setIsIdCopied] = useState(false);
  const [isLinkCopied, setIsLinkCopied] = useState(false);
  const { sessionId } = canvasState;

  const link = `${window.location.origin}/${sessionId}`;

  const copyId = async () => {
    await navigator.clipboard.writeText(sessionId);
    setIsIdCopied(true);
  };

  const copyLink = async () => {
    console.log("我tm来啦");
    await navigator.clipboard.writeText(link);
    setIsLinkCopied(true);
    toast.success("房间链接已复制，分享给ta吧！");
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setIsIdCopied(false);
    setIsLinkCopied(false);
  };

  return (
    <>
      <Button>
        <span className={styles.share} onClick={copyLink}>
          分享房间 <Icon className="share__btn">share</Icon>
        </span>
      </Button>
    </>
  );
};

export default ShareButton;
