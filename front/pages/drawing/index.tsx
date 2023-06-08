import type { NextPage } from "next";
import Note from "@note/Note";
import Seo from "@common/Seo";
import Drawing from "@drawingComp/Drawing";

const DrawingPage: NextPage = () => {
  return (
    <>
      <Seo title="그림퀴즈 하러가기" />
      <Note width="95%" height="95%">
        <Drawing />
      </Note>
    </>
  );
};

export default DrawingPage;
