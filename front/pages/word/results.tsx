import type { NextPage } from "next";
import {
  NoteContainer,
  NoteBackground,
  NoteHeader,
} from "../../components/word/Note.style";
import Results from "../../components/word/results/Results";

const ResultPage: NextPage = () => {
  return (
    <NoteContainer>
      <NoteBackground>
        <NoteHeader />
        <Results />
      </NoteBackground>
    </NoteContainer>
  );
};

export default ResultPage;
