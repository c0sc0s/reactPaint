import { Button, Icon } from "@mui/material";
import { FC, useState } from "react";
import styles from "./UsersButton.module.scss";
import UsersList from "./UserList";

const UsersButton: FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  return (
    <div>
      <Button className={styles.users} onClick={() => setIsDrawerOpen(true)}>
        房间用户
        <Icon className={styles.users__btn}>hub</Icon>
      </Button>
      <UsersList onClose={() => setIsDrawerOpen(false)} isOpen={isDrawerOpen} />
    </div>
  );
};

export default UsersButton;
