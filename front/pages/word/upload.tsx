import type { NextPage } from "next";
import {
  NoteContainer,
  NoteBackground,
  NoteHeader,
} from "../../components/word/Note.style";
import Dropzone from "../../components/word/upload/Dropzone";

const UploadPage: NextPage = () => {
  return (
    <NoteContainer>
      <NoteBackground>
        <NoteHeader />
        <Dropzone />
      </NoteBackground>
    </NoteContainer>
  );
};

export default UploadPage;
