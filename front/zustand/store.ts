import create from "zustand";
import { devtools } from "zustand/middleware";

interface UserState {
  user: UserProperties | null;
}

interface UserProperties {
  userId: string;
  userName: string;
  email: string;
  provider: string;
  joinedAt: string;
  lastloginedAt: string;
  activated: boolean;
  token: string;
}

export const userStore = create<UserState>()(
  devtools((set) => ({
    user: null,
  })),
);
