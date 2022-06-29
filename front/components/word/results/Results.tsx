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
import LoginRequiredModal from "../../../common/loginRequiredModal/LoginRequiredModal";
import { ResultProps } from "../../../common/types/resultsType";

function Results({ wordInfo }: ResultProps) {
  const router = useRouter();
  const url = router.asPath;

  const [engWord, setEngWord] = useState(wordInfo.wordEng[0]);
  const [korWord, setKorWord] = useState(wordInfo.wordKor[0]);

  const [editModalOpen, setEditModalOpen] = useState(false);
  const [saveModalOpen, setSaveModalOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);

  const ttsBtnClickHandler = () => {
    const tts: SpeechSynthesisUtterance = new SpeechSynthesisUtterance(engWord);
    tts.lang = "en-US";
    window.speechSynthesis.speak(tts);
  };

  const editBtnClickHandler = () => {
    setEditModalOpen(true);
  };

  const saveBtnClickHandler = () => {
    if (sessionStorage.getItem("userToken")) {
      setSaveModalOpen(true);
    } else {
      setLoginModalOpen(true);
    }
  };

  const modalCloseHandler = () => {
    setEditModalOpen(false);
    setSaveModalOpen(false);
    setLoginModalOpen(false);
  };

  return (
    <>
      <ResultsContainer>
        <ImageContainer>
          <ThumbImage
            src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${wordInfo.wordKey}`}
            alt="submit-image"
          />
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
          large={true}
          url={url}>
          <EditForm
            imageUrl={`${process.env.NEXT_PUBLIC_IMAGE_URL}${wordInfo.wordKey}`}
            onClose={modalCloseHandler}
            setEngWord={setEngWord}
            setKorWord={setKorWord}
            engWordList={wordInfo.wordEng}
            korWordList={wordInfo.wordKor}
          />
        </Modal>
      )}
      {loginModalOpen && (
        <Modal
          open={loginModalOpen}
          width="400px"
          onClose={modalCloseHandler}
          large={false}
          url={url}>
          <LoginRequiredModal onClose={modalCloseHandler} />
        </Modal>
      )}
      {saveModalOpen && (
        <Modal
          open={saveModalOpen}
          width="400px"
          onClose={modalCloseHandler}
          large={false}
          url={url}>
          <SaveForm
            onClose={modalCloseHandler}
            wordId={wordInfo.wordId}
            engWord={engWord}
            korWord={korWord}
          />
        </Modal>
      )}
    </>
  );
}

export default Results;
