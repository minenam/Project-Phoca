import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { useGameStore } from "../../../zustand/useGameStore";
import { shuffle } from "../../../common/utils/shuffle";
import {
  CardRootWrapper,
  GameWrapper,
} from "../../../components/wordQuiz/WordQuiz.style";
import WordQuizCardList from "../../../components/wordQuiz/WordQuizCardList";
import { HEADER_HEIGHT } from "../../../common/utils/constant";

const getWrodGameInit = async (wordbookId: string | string[] | undefined) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/word/game/${wordbookId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      },
    );
    const result = await res.json();
    const shuffled: string[] = shuffle(result[1]);
    useGameStore.setState({ answer: result[0] });
    console.log(shuffled);

    return shuffled;
  } catch (e) {
    console.error(e);
  }
};
const WordQuizGame = () => {
  const [cardShuffled, setCardShuffled] = useState<string[] | undefined>([]);
  const router = useRouter();
  const wordbookId = router.query.id;
  const gameResult = useGameStore((state) => state.answer);

  const { data } = useQuery("wordGameInit", () => getWrodGameInit(wordbookId));

  useEffect(() => {
    console.log("data=========>", data);
    data && setCardShuffled(data);
  }, [data]);

  return (
    <GameWrapper $headerHeight={HEADER_HEIGHT}>
      <CardRootWrapper>
        <WordQuizCardList shuffleList={cardShuffled} />
      </CardRootWrapper>
    </GameWrapper>
  );
};

export default WordQuizGame;
