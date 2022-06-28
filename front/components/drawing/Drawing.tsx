import { useState, useEffect } from "react";
import { useQuery } from "react-query";
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

interface DrawingWord {
  id: number;
  wordEng: string;
  wordKor: string;
}

const getDrawingWord = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/quiz`);
  const result: DrawingWord = await res.json();
  return result;
};

function Drawing() {
  const [resetBtnClick, setResetBtnClick] = useState(false);
  const [selectedWord, setSelectedWord] = useState<DrawingWord | undefined>(
    undefined,
  );

  const { data } = useQuery("drawing-word", getDrawingWord, {
    enabled: selectedWord === undefined,
  });

  useEffect(() => {
    setSelectedWord(data);
  }, [data]);

  return (
    <DrawingContainer>
      <Question>{data && data.wordEng}</Question>
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
