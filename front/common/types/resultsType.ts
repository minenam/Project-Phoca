export interface ResultProps {
  wordInfo: WordInfo;
}

export interface WordInfo {
  wordEng: string[];
  wordKor: string[];
  wordKey: string;
  wordbookId: null | string;
  wordId: string;
}
