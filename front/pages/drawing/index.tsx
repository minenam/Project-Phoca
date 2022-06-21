import type { NextPage } from "next";
import Note from "../../common/note/Note";
import Drawing from "../../components/drawing/Drawing";

const DrawingPage: NextPage = () => {
  return (
    <Note width="95%" height="95%">
      <Drawing />
    </Note>
  );
};

export default DrawingPage;
