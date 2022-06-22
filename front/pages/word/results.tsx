import type { NextPage } from "next";
import { WORD_NOTE_WIDTH, WORD_NOTE_HEIGHT } from "../../common/utils/constant";
import Note from "../../common/note/Note";
import Results from "../../components/word/results/Results";

const ResultPage: NextPage = () => {
  return (
    <Note width={WORD_NOTE_WIDTH} height={WORD_NOTE_HEIGHT}>
      <Results />
    </Note>
  );
};

export default ResultPage;
