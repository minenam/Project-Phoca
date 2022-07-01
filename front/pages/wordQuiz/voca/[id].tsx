import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import {
  WORD_NOTE_WIDTH,
  WORD_NOTE_HEIGHT,
} from "../../../common/utils/constant";
import Note from "../../../common/note/Note";
import Seo from "../../../common/Seo";
import { FaVolumeUp } from "react-icons/fa";
import {
  TitleContainer,
  Title,
  WordCardContainer,
  WordCard,
  TtsBtnContainer,
  TtsBtn,
  TextContainer,
  EngWord,
  KorWord,
  PageBtnContainer,
  LeftBtn,
  RightBtn,
} from "../../../components/wordQuiz/voca/Voca.style";

interface Word {
  wordId: string;
  wordKey: string;
  wordEng: string[];
  wordKor: string[];
  wordbook: {
    wordbookId: string;
    userId: string;
    wordbookName: string;
    secured: boolean;
    createDate: string;
  };
}

const getWords = async (id: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/word/all/${id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    },
  );
  const result: Word[] = await res.json();
  return result;
};

function Voca() {
  const router = useRouter();
  const wordbookId = router.query.id as string;

  const [wordList, setWordList] = useState<Word[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const [korWordVisible, setKorWordVisible] = useState(false);

  const isValid = wordList.length > 0;

  const { data } = useQuery("words", () => getWords(wordbookId), {
    enabled: !!wordbookId,
  });

  const ttsBtnClickHandler = (word: string) => {
    const tts: SpeechSynthesisUtterance = new SpeechSynthesisUtterance(word);
    tts.lang = "en-US";
    window.speechSynthesis.speak(tts);
  };

  useEffect(() => {
    if (data && data.length > 0) {
      setWordList(data);
    }
  }, [data]);

  return (
    <>
      <Seo title="단어장 외우기" />
      <Note width={WORD_NOTE_WIDTH} height={WORD_NOTE_HEIGHT}>
        <TitleContainer>
          <Title>{isValid && wordList[0].wordbook.wordbookName}</Title>
        </TitleContainer>

        <WordCardContainer>
          <WordCard>
            <TtsBtnContainer>
              <TtsBtn
                onClick={() =>
                  ttsBtnClickHandler(wordList[currentIdx].wordEng[0])
                }>
                <FaVolumeUp />
              </TtsBtn>
            </TtsBtnContainer>

            <TextContainer onClick={() => setKorWordVisible((cur) => !cur)}>
              <EngWord
                $long={isValid && wordList[currentIdx].wordEng[0].length > 6}>
                {isValid && wordList[currentIdx].wordEng[0]}
              </EngWord>
              {korWordVisible && (
                <KorWord>{isValid && wordList[currentIdx].wordKor[0]}</KorWord>
              )}
            </TextContainer>
          </WordCard>
        </WordCardContainer>

        <PageBtnContainer>
          <LeftBtn
            onClick={() => {
              setCurrentIdx((cur) => cur - 1);
              setKorWordVisible(false);
            }}
            disabled={currentIdx === 0}
            $disabled={currentIdx === 0}
          />
          {currentIdx + 1} / {wordList.length > 0 && wordList.length}
          <RightBtn
            onClick={() => {
              setCurrentIdx((cur) => cur + 1);
              setKorWordVisible(false);
            }}
            disabled={currentIdx === wordList.length - 1}
            $disabled={currentIdx === wordList.length - 1}
          />
        </PageBtnContainer>
      </Note>
    </>
  );
}

export default Voca;
