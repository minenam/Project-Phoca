import CanvasComp from "./Canvas";
import {
  DrawingContainer,
  Question,
  CanvasContainer,
  BtnContainer,
  SubmitBtn,
} from "./Drawing.style";

function Drawing() {
  return (
    <DrawingContainer>
      <Question>Apple</Question>
      <CanvasContainer>
        <CanvasComp />
      </CanvasContainer>
      <BtnContainer>
        <SubmitBtn>제출하기</SubmitBtn>
      </BtnContainer>
    </DrawingContainer>
  );
}

export default Drawing;
