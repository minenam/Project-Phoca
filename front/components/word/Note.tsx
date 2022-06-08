import { useRouter } from "next/router";
import { NoteContainer, NoteBackground, NoteHeader } from "./NoteStyle";
import Dropzone from "./upload/Dropzone";
import Results from "./results/Results";

function Note() {
  const router = useRouter();

  return (
    <NoteContainer>
      <NoteBackground>
        <NoteHeader />
        {router.asPath === "/word/upload" ? <Dropzone /> : <Results />}
      </NoteBackground>
    </NoteContainer>
  );
}

export default Note;
