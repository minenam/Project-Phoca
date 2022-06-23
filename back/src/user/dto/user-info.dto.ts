import { Users } from "../user.entity";

export class UserInfo {
  statusCode: number;
  message: string;
  data: {
    userId: Users["userId"];
    userName: Users["userName"];
    email: Users["email"];
    comment: Users["comment"];
    userImage: Users["userImage"];
  };
}

export type UserInfoType = UserInfo;
