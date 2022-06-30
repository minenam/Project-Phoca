import { CardImageItem, CardItem } from "./WordQuiz.style";
import { CardProps } from "../../common/types/propsType";
import { useEffect } from "react";

const WordQuizCard = ({ value }: CardProps) => {
  const extensions = [".jpg", ".png", ".jpeg"];

  return (
    <CardItem>
      {extensions.includes(value.substring(value.indexOf("."))) ? (
        <CardImageItem
          src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${value}`}
          alt="cardImage"
        />
      ) : (
        <p>{value}</p>
      )}
    </CardItem>
  );
};

export default WordQuizCard;
