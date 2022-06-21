import CanvasComp from "./Canvas";
import { DrawingContainer, Question, SubmitBtn } from "./Drawing.style";

function Drawing() {
  return (
    <DrawingContainer>
      <Question>Apple</Question>
      <CanvasComp />
      <SubmitBtn>제출하기</SubmitBtn>
    </DrawingContainer>
  );
}

export default Drawing;
