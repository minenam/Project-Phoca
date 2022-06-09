import { useRouter } from "next/router";
import { useEffect } from "react";
import {
  ResultsContainer,
  ImageContainer,
  WordContainer,
  IconContainer,
  BtnContainer,
  EngWord,
  KorWord,
  TtsBtn,
  EditBtn,
  Button,
} from "./Results.style";
import { FaVolumeUp, FaEdit } from "react-icons/fa";

interface Word {
  word?: string;
  imageUrl?: string;
}

function Results() {
  const router = useRouter();
  const { word, imageUrl }: Word = router.query;

  useEffect(() => {
    console.log(router);
  }, []);

  return (
    <ResultsContainer>
      <ImageContainer>
        <img src={imageUrl} alt="submit-image" />
      </ImageContainer>
      <WordContainer>
        <EngWord>{word}</EngWord>
        <IconContainer>
          <TtsBtn>
            <FaVolumeUp />
          </TtsBtn>
          <EditBtn>
            <FaEdit />
          </EditBtn>
        </IconContainer>
      </WordContainer>
      <KorWord>사과</KorWord>
      <BtnContainer>
        <Button>사진 다시 찍기</Button>
        <Button>단어장 저장하기</Button>
      </BtnContainer>
    </ResultsContainer>
  );
}

export default Results;
