import { CardImageItem, CardItem } from "./WordQuiz.style";
import { useState } from "react";
import WordQuizCard from "./WordQuizCard";

interface ShuffleProps {
  shuffleList: string[] | undefined;
}
const WordQuizCardList = ({ shuffleList }: ShuffleProps) => {
  const [choiceOne, setChoiceOne] = useState();
  const [choiceTwo, setChoiceTwo] = useState();
  const [isTwoSelected, setIsTwoSelected] = useState(false);

  return (
    <>
      {shuffleList &&
        shuffleList.map((item, idx) => {
          console.log("item", item);
          return <WordQuizCard key={idx} value={item} />;
        })}
    </>
  );
};

export default WordQuizCardList;
