export interface Word {
  wordId: string;
  wordKey: string;
  wordEng: string[];
  wordKor: string[];
  wordbook: {
    wordbookId: string;
    userId: string;
    wordbookName: string;
    secured: boolean;
    createDate: string;
  };
}
