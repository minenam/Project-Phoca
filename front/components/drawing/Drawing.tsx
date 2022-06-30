import { useState, useEffect, useRef } from "react";
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

const dataURItoBlob = (dataURI: string) => {
  const byteString: string = atob(dataURI.split(",")[1]);
  const mimeString: string = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ia = new Uint8Array(byteString.length);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
};

const getDrawingWord = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/quiz`);
  const result: DrawingWord = await res.json();
  return result;
};

function Drawing() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [selectedWord, setSelectedWord] = useState<DrawingWord | undefined>(
    undefined,
  );

  const { data } = useQuery("drawing-word", getDrawingWord, {
    enabled: selectedWord === undefined,
  });

  const submitBtnClickHandler = () => {
    if (!canvasRef.current) {
      return;
    }

    const canvas = canvasRef.current;
    const dataUri = canvas.toDataURL();
    const blob = dataURItoBlob(dataUri);

    const formData = new FormData();
    formData.append("image", blob);
    formData.append("answer", selectedWord?.wordEng as string);
  };

  const resetCanvas = () => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.getContext("2d")!!.clearRect(0, 0, canvas.width, canvas.height);
  };

  useEffect(() => {
    setSelectedWord(data);
  }, [data]);

  return (
    <DrawingContainer>
      <Question>{data && data.wordEng}</Question>
      <ResetBtnContainer>
        <ResetBtn onClick={resetCanvas}>모두 지우기</ResetBtn>
      </ResetBtnContainer>

      <CanvasContainer>
        <CanvasComp canvasRef={canvasRef} />
      </CanvasContainer>

      <SubmitBtnContainer>
        <SubmitBtn onClick={submitBtnClickHandler}>제출하기</SubmitBtn>
      </SubmitBtnContainer>
    </DrawingContainer>
  );
}

export default Drawing;
