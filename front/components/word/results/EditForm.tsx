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
  WriteWordContainer,
  InfoTitle,
  InfoLine,
  InputContainer,
  Field,
  Label,
  Input,
  BtnContainer,
  Button,
} from "./EditForm.style";

interface EditFormProps {
  imageUrl?: string;
  onClose: () => void;
}

interface Data {
  engWord: string;
  korWord: string;
}

function EditForm({ imageUrl, onClose }: EditFormProps) {
  const [engWord, setEngWord] = useState("");
  const [korWord, setKorWord] = useState("");

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

  const checkboxClickHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const selected = fakeData.filter((item, idx) => idx === Number(value));
    if (selected) {
      setEngWord(selected[0].engWord);
      setKorWord(selected[0].korWord);
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(engWord, korWord);
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
                checked={item.engWord === engWord}
                onChange={checkboxClickHandler}
              />
              <EngWord>{item.engWord}</EngWord>
              <KorWord>{item.korWord}</KorWord>
            </WordContainer>
          ))}
        </WordListContainer>
      </SelectWordContainer>
      <WriteWordContainer>
        <InfoTitle>원하는 단어가 없다면 직접 적어주세요!</InfoTitle>
        <InfoLine />
        <InputContainer>
          <Field>
            <Label htmlFor="engWord">영어단어</Label>
            <Input
              id="engWord"
              name="engWord"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setEngWord(e.target.value)
              }
              value={engWord}
            />
          </Field>
          <Field>
            <Label htmlFor="korWord">뜻</Label>
            <Input
              id="korWord"
              name="korWord"
              type="text"
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setKorWord(e.target.value)
              }
              value={korWord}
            />
          </Field>
        </InputContainer>
      </WriteWordContainer>
      <BtnContainer>
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={engWord === "" || korWord === ""}>
          저장하기
        </Button>
        <Button onClick={onClose}>취소하기</Button>
      </BtnContainer>
    </>
  );
}

export default EditForm;
