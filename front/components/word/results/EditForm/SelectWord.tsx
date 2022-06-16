import { Dispatch, SetStateAction } from "react";
import {
  SelectWordContainer,
  TitleContainer,
  Title,
  Line,
  ImageContainer,
  ThumbImage,
  WordListContainer,
  WordContainer,
  EngWord,
  KorWord,
} from "./EditForm.style";
import { Data } from "./EditForm";

interface SelectWordProps {
  data: Data[];
  imageUrl?: string;
  setEngWord: Dispatch<SetStateAction<string>>;
  setKorWord: Dispatch<SetStateAction<string>>;
  engWord: string;
}
function SelectWord(props: SelectWordProps) {
  const { data, imageUrl, setEngWord, setKorWord, engWord } = props;
  const checkboxClickHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const selected = data.filter((item, idx) => idx === Number(value));
    if (selected) {
      setEngWord(selected[0].engWord);
      setKorWord(selected[0].korWord);
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
      <WordListContainer>
        {props.data.map((item, idx) => (
          <WordContainer key={`${item.engWord}${idx}`}>
            <input
              type="checkbox"
              name="word"
              value={idx}
              checked={item.engWord === engWord}
              onChange={checkboxClickHandler}
            />
            <EngWord>{item.engWord}</EngWord>
            <KorWord>{item.korWord}</KorWord>
          </WordContainer>
        ))}
      </WordListContainer>
    </SelectWordContainer>
  );
}

export default SelectWord;
