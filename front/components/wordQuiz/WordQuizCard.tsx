import {
  CardBackText,
  CardFront,
  CardImageItem,
  CardItem,
  Image,
} from "./WordQuiz.style";
import { CardProps } from "../../common/types/propsType";
import { useEffect, useRef, useState } from "react";
import { IMAGE_EXTENSION } from "../../common/utils/constant";

const WordQuizCard = ({
  value,
  isTwoSelected,
  setIsTwoSelected,
  handleChoice,
}: CardProps) => {
  const [flip, setFlip] = useState(false);
  const [height, setHeight] = useState("initial");

  const frontEl = useRef();
  const backEl = useRef();

  const setMaxHeight = () => {};

  const handleClick = (e: React.MouseEvent<HTMLDivElement>, value: string) => {
    setFlip((v) => !v);
    console.log("e.target", e.currentTarget.lastElementChild?.innerHTML);
    console.log("e.target", e.currentTarget.lastChild);
    // console.log(e.currentTarget.querySelector("p")!.innerText);
    if (e.currentTarget && !e.currentTarget.className.includes("flip")) {
      handleChoice(value);
      console.log("value", value);
    }
  };
  const isFlipped = () => {
    setFlip(false);
    setIsTwoSelected(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      isFlipped();
      console.log("setTimeout");
    }, 500);

    return () => clearTimeout(timer);
  }, [isTwoSelected]);

  return (
    <CardItem
      $flip={flip}
      onClick={(e) => handleClick(e, value.data)}
      className={`${flip ? "flip" : ""}`}
      $matched={value.matched}>
      <CardFront>
        <Image src="/logo.png" alt="front card" />
      </CardFront>
      {IMAGE_EXTENSION.includes(
        value.data.substring(value.data.indexOf(".")),
      ) ? (
        <CardImageItem
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${value.data}`}
          alt="cardImage"
        />
      ) : (
        <CardBackText>{value.data}</CardBackText>
      )}
    </CardItem>
  );
};

export default WordQuizCard;
