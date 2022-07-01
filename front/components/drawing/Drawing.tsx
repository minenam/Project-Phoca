import { useRouter } from "next/router";
import { useState, useEffect, useRef } from "react";
import { useQuery, useMutation } from "react-query";
import CanvasComp from "./Canvas";
import Modal from "@modal/Modal";
import Result from "./Result";
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

// dataUri를 blob으로 바꾸는 함수
const dataURItoBlob = (dataURI: string) => {
  const byteString: string = atob(dataURI.split(",")[1]);
  const mimeString: string = dataURI.split(",")[0].split(":")[1].split(";")[0];
  const ia = new Uint8Array(byteString.length);

  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return new Blob([ia], { type: mimeString });
};

// 그림 문제 받아오기
const getDrawingWord = async () => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/quiz`);
  const result: DrawingWord = await res.json();
  return result;
};

// ai로 그림을 보내 정답인지 판별
const getAnwser = async (formData: FormData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_DRAWING_API_URL}`, {
    method: "POST",
    body: formData,
  });

  const result = await res.json();
  return result;
};

function Drawing() {
  const router = useRouter();
  const url = router.pathname;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [selectedWord, setSelectedWord] = useState<DrawingWord | undefined>(
    undefined,
  );
  const [resultModalOpen, setResultModalOpen] = useState(false);

  const { data } = useQuery("drawing-word", getDrawingWord, {
    enabled: selectedWord === undefined,
  });

  const drawingMutation = useMutation(getAnwser, {
    onSuccess: (data, variables) => {
      setResultModalOpen(true);
    },
    onError: (err) => {
      console.log(err);
    },
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

    drawingMutation.mutate(formData);
  };

  const resetCanvas = () => {
    if (!canvasRef.current) {
      return;
    }
    const canvas: HTMLCanvasElement = canvasRef.current;
    canvas.getContext("2d")!!.clearRect(0, 0, canvas.width, canvas.height);
  };

  const modalCloseHandler = () => {
    setResultModalOpen(false);
  };

  useEffect(() => {
    setSelectedWord(data);
  }, [data]);

  return (
    <>
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

      {resultModalOpen && (
        <Modal
          open={resultModalOpen}
          width="500px"
          large={true}
          url={url}
          onClose={modalCloseHandler}>
          <Result
            result={drawingMutation.data.result}
            engWord={selectedWord?.wordEng}
            korWord={selectedWord?.wordKor}
            predicted={drawingMutation.data.predicted}
            onClose={modalCloseHandler}
          />
        </Modal>
      )}
    </>
  );
}

export default Drawing;
