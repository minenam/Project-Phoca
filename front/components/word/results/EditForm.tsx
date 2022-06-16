import { useState } from "react";
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

interface EditFormProps {
  imageUrl?: string;
}

interface Data {
  engWord: string;
  korWord: string;
}

function EditForm({ imageUrl }: EditFormProps) {
  const [selectedWord, setSelectedWord] = useState<Data>({
    engWord: "",
    korWord: "",
  });

  const fakeData: Data[] = [
    {
      engWord: "Hello1",
      korWord: "안녕하세요",
    },
    {
      engWord: "Hello2",
      korWord: "안녕하세요",
    },
    {
      engWord: "Hello3",
      korWord: "안녕하세요",
    },
    {
      engWord: "Hello4",
      korWord: "안녕하세요",
    },
  ];

  const CheckboxClickHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const selected = fakeData.filter((item, idx) => idx === Number(value));
    if (selected) {
      setSelectedWord(selected[0]);
    }
  };

  return (
    <>
      <SelectWordContainer>
        <TitleContainer>
          <Title>Change</Title>
          <Line />
          <ImageContainer>
            <ThumbImage src={imageUrl} />
          </ImageContainer>
        </TitleContainer>
        <WordListContainer>
          {fakeData.map((item, idx) => (
            <WordContainer key={`${item.engWord}${idx}`}>
              <input
                type="checkbox"
                name="word"
                value={idx}
                checked={item.engWord === selectedWord.engWord}
                onChange={CheckboxClickHandler}
              />
              <EngWord>{item.engWord}</EngWord>
              <KorWord>{item.korWord}</KorWord>
            </WordContainer>
          ))}
        </WordListContainer>
      </SelectWordContainer>
    </>
  );
}

export default EditForm;
