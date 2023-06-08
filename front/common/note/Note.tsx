import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "@utils/constant";
import { NoteContainer, NoteBackground, NoteHeader } from "./Note.style";

interface NoteProps {
  children: React.ReactNode;
  width: string;
  height: string;
}

function Note({ children, width, height }: NoteProps) {
  return (
    <NoteContainer $headerHeight={HEADER_HEIGHT} $sidebarWidth={SIDEBAR_WIDTH}>
      <NoteBackground $width={width} $height={height}>
        <NoteHeader />
        {children}
      </NoteBackground>
    </NoteContainer>
  );
}

export default Note;
