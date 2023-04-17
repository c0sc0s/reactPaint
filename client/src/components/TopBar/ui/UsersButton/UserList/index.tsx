import { FC } from "react";
import { observer } from "mobx-react-lite";

import styles from "./UsersList.module.scss";
import usersState from "@/store/userState";
import UsersListItem from "../UserItem";
import { Drawer } from "@mui/material";

interface UsersListProps {
  isOpen: boolean;
  onClose: () => void;
}

const UsersList: FC<UsersListProps> = observer(({ isOpen, onClose }) => {
  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      className={styles.drawer}
    >
      <div className={styles.usersList}>
        <h2 className={styles.usersList__title}>当前房间用户列表</h2>
        {usersState.users.map((user, index) => (
          <UsersListItem key={index} username={user.username} />
        ))}
      </div>
    </Drawer>
  );
});

export default UsersList;
