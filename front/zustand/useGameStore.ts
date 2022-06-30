import create from "zustand";
import { devtools } from "zustand/middleware";

export const useGameStore = create(
  devtools(() => ({
    answer: null,
  })),
);
