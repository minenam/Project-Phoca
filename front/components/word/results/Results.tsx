import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
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
import Modal from "../../../common/modal/Modal";
import EditForm from "./EditForm/EditForm";
import SaveForm from "./SaveForm/SaveForm";

interface ImageUrl {
  imageUrl?: string;
}

function Results() {
  const router = useRouter();
  const { imageUrl }: ImageUrl = router.query;

  const [engWord, setEngWord] = useState("apple");
  const [korWord, setKorWord] = useState("사과");

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);

  const ttsBtnClickHandler = () => {
    const temp: SpeechSynthesisUtterance = new SpeechSynthesisUtterance(
      engWord,
    );
    const voice: SpeechSynthesisVoice[] = window.speechSynthesis.getVoices();
    temp.voice = voice[2];
    window.speechSynthesis.speak(temp);
  };

  const editBtnClickHandler = () => {
    setEditModalOpen(true);
  };

  const saveBtnClickHandler = () => {
    setSaveModalOpen(true);
  };

  const modalCloseHandler = () => {
    setEditModalOpen(false);
    setSaveModalOpen(false);
  };

  return (
    <>
      <ResultsContainer>
        <ImageContainer>
          <ThumbImage src={imageUrl} alt="submit-image" />
        </ImageContainer>
        <WordContainer>
          <EngWord>{engWord}</EngWord>
          <IconContainer>
            <TtsBtn onClick={ttsBtnClickHandler}>
              <FaVolumeUp />
            </TtsBtn>
            <EditBtn onClick={editBtnClickHandler}>
              <FaEdit />
            </EditBtn>
          </IconContainer>
          <KorWord>{korWord}</KorWord>
        </WordContainer>
        <BtnContainer>
          <Link href="/word/upload">
            <Button>사진 다시 찍기</Button>
          </Link>
          <Button onClick={saveBtnClickHandler}>단어장 저장하기</Button>
        </BtnContainer>
      </ResultsContainer>
      {editModalOpen && (
        <Modal
          open={editModalOpen}
          width="800px"
          onClose={modalCloseHandler}
          large={true}>
          <EditForm
            imageUrl={imageUrl}
            onClose={modalCloseHandler}
            setEngWord={setEngWord}
            setKorWord={setKorWord}
          />
        </Modal>
      )}
      {saveModalOpen && (
        <Modal
          open={saveModalOpen}
          width="400px"
          onClose={modalCloseHandler}
          large={false}>
          <SaveForm onClose={modalCloseHandler} />
        </Modal>
      )}
    </>
  );
}

export default Results;
