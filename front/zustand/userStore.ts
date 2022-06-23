import create from "zustand";
import { devtools } from "zustand/middleware";

interface UserState {
  user: UserProperties | null;
}

export interface UserProperties {
  userId: string;
  userName: string;
  email: string;
  comment: string;
  userImage: string;
}

export const userStore = create<UserState>()(
  devtools((set) => ({
    user: null,
  })),
);
