import { Users } from "../user.entity";
import { UserInfo } from "./user-info.dto";

export class LoginUserInfo extends UserInfo {
  statusCode: number;
  message: string;
  data: {
    userId: Users["userId"];
    userName: Users["userName"];
    email: Users["email"];
    comment: Users["comment"];
    userImage: Users["userImage"];
  };
  token: string;
}

export type LoginUserInfoType = LoginUserInfo;
