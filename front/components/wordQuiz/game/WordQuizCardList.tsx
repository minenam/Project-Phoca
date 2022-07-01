import { CardImageItem, CardItem } from "./WordQuizGame.style";
import { useEffect, useState } from "react";
import WordQuizCard from "./WordQuizCard";
import { IMAGE_EXTENSION } from "../../../common/utils/constant";
import { useGameStore } from "../../../zustand/useGameStore";

interface ShuffleProps {
  shuffleList: string[] | undefined;
}

const WordQuizCardList = ({ shuffleList }: ShuffleProps) => {
  const [cardList, setCardList] = useState<
    {
      data: string;
      matched: boolean;
    }[]
  >();
  const [choiceOne, setChoiceOne] = useState("");
  const [choiceTwo, setChoiceTwo] = useState("");
  const [isTwoSelected, setIsTwoSelected] = useState(false);

  const answer = useGameStore((state) => state.answer);
  const totalAnswer = useGameStore((state) => state.total);

  const setCards = () => {
    const addExtended = shuffleList?.map((data) => {
      return { data, matched: false };
    });
    setCardList(addExtended);
  };

  const handleChoice = (e: string) => {
    if (choiceOne && choiceOne !== e) {
      setChoiceTwo(e);
    } else {
      setChoiceOne(e);
    }
  };

  const findAnswer = () => {
    const nameChoice = IMAGE_EXTENSION.includes(
      choiceOne.substring(choiceOne.indexOf(".")),
    )
      ? choiceTwo
      : choiceOne;

    const imageChoice = IMAGE_EXTENSION.includes(
      choiceOne.substring(choiceOne.indexOf(".")),
    )
      ? choiceOne
      : choiceTwo;

    if (
      answer.filter((item) => item[nameChoice] === imageChoice).length !== 0
    ) {
      useGameStore.setState({ total: totalAnswer + 2 });

      setCardList((cards) => {
        //if(정답 로직)
        return cards?.map((card, idx) => {
          if (card.data === nameChoice || card.data === imageChoice) {
            return { ...card, matched: true };
          } else {
            return card;
          }
        });
      });
      correctReset();
    } else {
      reset();
    }
  };

  const reset = () => {
    setChoiceOne("");
    setChoiceTwo("");
    setIsTwoSelected(true);
  };

  const correctReset = () => {
    setChoiceOne("");
    setChoiceTwo("");
    setIsTwoSelected(false);
  };

  useEffect(() => {
    setCards();
  }, [shuffleList]);

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      if (
        IMAGE_EXTENSION.includes(choiceOne.substring(choiceOne.indexOf("."))) &&
        IMAGE_EXTENSION.includes(choiceTwo.substring(choiceTwo.indexOf(".")))
      ) {
        return reset();
      } else if (
        !IMAGE_EXTENSION.includes(
          choiceOne.substring(choiceOne.indexOf(".")),
        ) &&
        !IMAGE_EXTENSION.includes(choiceTwo.substring(choiceTwo.indexOf(".")))
      ) {
        return reset();
      }
      findAnswer();
    }
  }, [choiceOne, choiceTwo]);

  return (
    <>
      {shuffleList &&
        cardList?.map((item, idx) => {
          return (
            <WordQuizCard
              key={idx}
              value={item}
              handleChoice={handleChoice}
              isTwoSelected={isTwoSelected}
              setIsTwoSelected={setIsTwoSelected}
            />
          );
        })}
    </>
  );
};

export default WordQuizCardList;
