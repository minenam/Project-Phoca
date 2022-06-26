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

export interface WordBook {
  wordbookName: string;
  secured: boolean;
  userId: string;
  wordbookId: string;
  createDate: string;
}
