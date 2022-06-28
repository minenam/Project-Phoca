import type { NextPage } from "next";
import { WORD_NOTE_WIDTH, WORD_NOTE_HEIGHT } from "../../common/utils/constant";
import Seo from "../../common/Seo";
import Note from "../../common/note/Note";
import Dropzone from "../../components/word/upload/Dropzone";

const UploadPage: NextPage = () => {
  return (
    <>
      <Seo title="단어장 만들기" />
      <Note width={WORD_NOTE_WIDTH} height={WORD_NOTE_HEIGHT}>
        <Dropzone />
      </Note>
    </>
  );
};

export default UploadPage;
