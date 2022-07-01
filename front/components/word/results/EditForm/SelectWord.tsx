import { Dispatch, SetStateAction } from "react";
import {
  SelectWordContainer,
  TitleContainer,
  Title,
  Line,
  ImageContainer,
  ThumbImage,
  ListContainer,
  ItemContainer,
  EngWord,
  KorWord,
} from "./EditForm.style";
import { Data } from "./EditForm";

interface SelectWordProps {
  data: Data[];
  imageUrl?: string;
  setSelectedEngWord: Dispatch<SetStateAction<string>>;
  setSelectedKorWord: Dispatch<SetStateAction<string>>;
  selectedEngWord: string;
}

function SelectWord({
  data,
  imageUrl,
  setSelectedEngWord,
  setSelectedKorWord,
  selectedEngWord,
}: SelectWordProps) {
  const checkboxClickHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const selected = data.filter((item, idx) => idx === Number(value));
    if (selected) {
      setSelectedEngWord(selected[0].engWord);
      setSelectedKorWord(selected[0].korWord);
    }
  };

  return (
    <SelectWordContainer>
      <TitleContainer>
        <Title>Change</Title>
        <Line />
        <ImageContainer>
          <ThumbImage src={imageUrl} />
        </ImageContainer>
      </TitleContainer>
      <ListContainer $height="300px">
        {data.map((item, idx) => (
          <ItemContainer key={`${item.engWord}${idx}`}>
            <input
              type="checkbox"
              name="word"
              value={idx}
              checked={item.engWord === selectedEngWord}
              onChange={checkboxClickHandler}
            />
            <EngWord>{item.engWord}</EngWord>
            <KorWord>{item.korWord}</KorWord>
          </ItemContainer>
        ))}
      </ListContainer>
    </SelectWordContainer>
  );
}

export default SelectWord;
