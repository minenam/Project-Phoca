import Link from "next/link";
import { useRouter } from "next/router";
import {
  ResultsContainer,
  ImageContainer,
  WordContainer,
  IconContainer,
  BtnContainer,
  ThumbImage,
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

  const ttsBtnClickHandler = () => {
    const temp: SpeechSynthesisUtterance = new SpeechSynthesisUtterance(word);
    const voice: SpeechSynthesisVoice[] = window.speechSynthesis.getVoices();
    temp.voice = voice[2];
    window.speechSynthesis.speak(temp);
  };

  return (
    <ResultsContainer>
      <ImageContainer>
        <ThumbImage src={imageUrl} alt="submit-image" />
      </ImageContainer>
      <WordContainer>
        <EngWord>{word}</EngWord>
        <IconContainer>
          <TtsBtn onClick={ttsBtnClickHandler}>
            <FaVolumeUp />
          </TtsBtn>
          <EditBtn>
            <FaEdit />
          </EditBtn>
        </IconContainer>
      </WordContainer>
      <KorWord>사과</KorWord>
      <BtnContainer>
        <Link href="/word/upload">
          <Button>사진 다시 찍기</Button>
        </Link>
        <Button>단어장 저장하기</Button>
      </BtnContainer>
    </ResultsContainer>
  );
}

export default Results;
