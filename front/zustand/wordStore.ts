import create from "zustand";
import { devtools } from "zustand/middleware";

interface WordState {
  word: WordProperties | null;
}

interface WordProperties {
  wordEng: string[];
  wordKor: string[];
  wordKey: string;
  wordbookId: null | string;
  wordId: string;
}

export const wordStore = create<WordState>()(
  devtools((set) => ({
    word: null,
  })),
);
