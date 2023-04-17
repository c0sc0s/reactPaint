import { FC } from "react";

import styles from "./UserItem.module.scss";

interface UsersListItemProps {
  username: string;
}

const UsersListItem: FC<UsersListItemProps> = ({ username }) => {
  return (
    <div className={styles.usersListItem}>
      <p className={styles.usersListItem__desc}>{username}</p>
      <span className={styles.usersListItem__circle}></span>
    </div>
  );
};

export default UsersListItem;
