import { useState } from "react";
import CanvasComp from "./Canvas";
import {
  DrawingContainer,
  Question,
  CanvasContainer,
  SubmitBtnContainer,
  SubmitBtn,
  ResetBtnContainer,
  ResetBtn,
} from "./Drawing.style";

function Drawing() {
  const [resetBtnClick, setResetBtnClick] = useState(false);
  return (
    <DrawingContainer>
      <Question>Apple</Question>
      <ResetBtnContainer>
        <ResetBtn onClick={() => setResetBtnClick(true)}>모두 지우기</ResetBtn>
      </ResetBtnContainer>

      <CanvasContainer>
        <CanvasComp
          resetBtnClick={resetBtnClick}
          setResetBtnClick={setResetBtnClick}
        />
      </CanvasContainer>

      <SubmitBtnContainer>
        <SubmitBtn>제출하기</SubmitBtn>
      </SubmitBtnContainer>
    </DrawingContainer>
  );
}

export default Drawing;
