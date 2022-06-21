import CanvasComp from "./Canvas";
import {
  DrawingContainer,
  Question,
  BtnContainer,
  SubmitBtn,
} from "./Drawing.style";

function Drawing() {
  return (
    <DrawingContainer>
      <Question>Apple</Question>
      <CanvasComp />
      <BtnContainer>
        <SubmitBtn>제출하기</SubmitBtn>
      </BtnContainer>
    </DrawingContainer>
  );
}

export default Drawing;
