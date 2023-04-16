import { Box, Modal, Typography } from "@mui/material";
import { FormEvent, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

export default function LoginModal() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [localUsername, setLocalUsername] = useState("");
  const [isError, setIsError] = useState(false);
  // const { id } = useParams() as { id: string };

  useEffect(() => {
    //todo: refactor to do more judiciously
    setIsModalOpen(true);
  });

  // todo: form validation
  // const connectHandler = async (e?: FormEvent) => {
  //   e?.preventDefault();

  //   if (localUsername) {
  //     const response = await toast.promise(
  //       loginUser(localUsername, id),
  //       {
  //         loading: "Загрузка...",
  //         success: <span>Подключено</span>,
  //         error: (err) => <span>{err.response.data.message}</span>,
  //       },
  //       {
  //         style: {
  //           width: "250px",
  //         },
  //       }
  //     );

  //     canvasState.setUsername(localUsername);
  //     canvasState.setAuth(true);
  //     usersState.setUsers(response.users);

  //     setIsModalOpen(false);
  //     setIsError(false);
  //     setLocalUsername("");
  //   } else {
  //     setIsError(true);
  //   }
  // };

  return (
    <div>
      <Modal
        open={isModalOpen}
        // onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
