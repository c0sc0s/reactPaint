import { UserType } from "@/types/user";
import { makeAutoObservable } from "mobx";

class UserState {
  users: UserType[] = [];

  constructor() {
    makeAutoObservable(this);
  }

  public setUsers(users: UserType[]) {
    this.users = users;
  }

  public addUser(user: UserType) {
    this.users.push(user);
  }

  public removeUser(user: UserType) {
    this.users = this.users.filter((u) => u.id !== user.id);
  }
}

const usersState = new UserState();
export default usersState;
