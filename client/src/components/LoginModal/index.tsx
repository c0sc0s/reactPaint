import { Alert, Box, Button, Icon, Modal, TextField } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import style from "./LoginModal.module.scss";
import { loginUser } from "@/apis/userApi";
import canvasState from "@/store/canvasState";
import usersState from "@/store/userState";

export default function LoginModal() {
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [localUsername, setLocalUsername] = useState("");
  const [isError, setIsError] = useState(false);
  // const { id } = useParams() as { id: string };
  const id = "123";

  useEffect(() => {
    //todo: refactor to do more judiciously
    // setIsModalOpen(true);
  });

  // todo: form validation
  const connectHandler = async (e?: FormEvent) => {
    e?.preventDefault();
    console.log("submit");

    try {
      const response = await loginUser(localUsername, id);

      canvasState.setUsername(localUsername);
      canvasState.setAuth(true);
      usersState.setUsers(response.users);

      setIsModalOpen(false);
      console.log(isModalOpen);
      setIsError(false);
      setLocalUsername("");
    } catch {
      setIsError(true);
    }
  };

  return (
    <div>
      <Modal
        open={isModalOpen}
        onClose={() => {}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className={style.modalWrapper}
      >
        <Box className={style.modal}>
          {isError ? (
            <Alert variant="standard" color="warning">
              名称重复，请重新输入
            </Alert>
          ) : (
            <Alert variant="standard" color="info">
              请输入您的名称.
            </Alert>
          )}
          <form onSubmit={connectHandler}>
            <div className={style.inputField}>
              <TextField
                id="username"
                label="username"
                variant="outlined"
                className={style.input}
                value={localUsername}
                onChange={(e) => {
                  setLocalUsername(e.target.value);
                }}
              ></TextField>

              <Button variant="text" type="submit" className={style.button}>
                <Icon>done</Icon>
              </Button>
            </div>
          </form>
        </Box>
      </Modal>
    </div>
  );
}
