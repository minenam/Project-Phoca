import create from "zustand";
import { devtools } from "zustand/middleware";

export const useGameStore = create(
  devtools(() => ({
    total: 0,
    answer: [],
  })),
);
