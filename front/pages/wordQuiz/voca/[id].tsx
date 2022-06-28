import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import {
  WORD_NOTE_WIDTH,
  WORD_NOTE_HEIGHT,
} from "../../../common/utils/constant";
import Note from "../../../common/note/Note";
import { FaVolumeUp } from "react-icons/fa";
import {
  TitleContainer,
  Title,
  WordCardContainer,
  WordCard,
  TtsBtn,
  TextContainer,
  EngWord,
  KorWord,
  PageBtnContainer,
  LeftBtn,
  RightBtn,
} from "./Voca.style";

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

  const [wordbookList, setWordbookList] = useState<Word[]>([]);
  const [currentIdx, setCurrentIdx] = useState(0);

  const { data } = useQuery("words", () => getWords(wordbookId), {
    enabled: !!wordbookId,
  });

  useEffect(() => {
    if (data && data.length > 0) {
      setWordbookList(data);
    }
  }, [data]);

  return (
    <Note width={WORD_NOTE_WIDTH} height={WORD_NOTE_HEIGHT}>
      <TitleContainer>
        <Title>
          {wordbookList.length > 0 && wordbookList[0].wordbook.wordbookName}
        </Title>
      </TitleContainer>
      <WordCardContainer>
        <WordCard>
          <TtsBtn>
            <FaVolumeUp />
          </TtsBtn>
          <TextContainer>
            <EngWord>Word</EngWord>
            <KorWord>한글 뜻</KorWord>
          </TextContainer>
        </WordCard>
      </WordCardContainer>
      <PageBtnContainer>
        <LeftBtn />
        1 / 33
        <RightBtn />
      </PageBtnContainer>
    </Note>
  );
}

export default Voca;
