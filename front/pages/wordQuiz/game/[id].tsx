import { useRouter } from "next/router";
import { useQuery } from "react-query";
import { useEffect, useState } from "react";
import { useGameStore } from "../../../zustand/useGameStore";
import { shuffle } from "../../../common/utils/shuffle";
import {
  CardRootWrapper,
  GameBackHomeWrapper,
  GameEndButton,
  GameReGameWrapper,
  GameWrapper,
} from "../../../components/wordQuiz/WordQuiz.style";
import WordQuizCardList from "../../../components/wordQuiz/WordQuizCardList";
import { HEADER_HEIGHT } from "../../../common/utils/constant";
import Seo from "../../../common/Seo";

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

    return shuffled;
  } catch (e) {
    console.error(e);
  }
};
const WordQuizGame = () => {
  const [cardShuffled, setCardShuffled] = useState<string[] | undefined>([]);
  const [isGameEnd, setIsGameEnd] = useState(false);

  const router = useRouter();
  const wordbookId = router.query.id;

  const totalAnswer = useGameStore((state) => state.total);

  const { data } = useQuery("wordGameInit", () => getWrodGameInit(wordbookId), {
    refetchOnWindowFocus: false,
  });

  const backHandler = (direction: string) => {
    setIsGameEnd(false);
    router.push(direction);
  };

  useEffect(() => {
    data && setCardShuffled(data);
  }, [data]);

  useEffect(() => {
    useGameStore.setState({ total: 0 });
  }, []);

  useEffect(() => {
    totalAnswer === 16 ? setIsGameEnd(true) : setIsGameEnd(false);
  }, [totalAnswer]);

  return (
    <GameWrapper $headerHeight={HEADER_HEIGHT}>
      <Seo title="단어 퀴즈" />
      {isGameEnd && (
        <GameBackHomeWrapper>
          <GameEndButton
            $buttonCss
            $backgroundColor="skyblue"
            onClick={() => {
              backHandler("/");
            }}>
            홈으로
          </GameEndButton>
        </GameBackHomeWrapper>
      )}

      <CardRootWrapper>
        <WordQuizCardList shuffleList={cardShuffled} />
      </CardRootWrapper>
      {isGameEnd && (
        <GameReGameWrapper>
          <GameEndButton
            $buttonCss
            $backgroundColor="skyblue"
            onClick={() => {
              backHandler("/wordQuiz");
            }}>
            다시 할래요
          </GameEndButton>
        </GameReGameWrapper>
      )}
    </GameWrapper>
  );
};

export default WordQuizGame;
