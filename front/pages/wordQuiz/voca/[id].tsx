import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import {
  WORD_NOTE_WIDTH,
  WORD_NOTE_HEIGHT,
} from "../../../common/utils/constant";
import Note from "../../../common/note/Note";
import { TitleContainer, Title } from "./Voca.style";

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
    </Note>
  );
}

export default Voca;
