import { Dispatch, SetStateAction } from "react";
import {
  WriteWordContainer,
  InfoTitle,
  InfoLine,
  InputContainer,
  Field,
  Label,
  Input,
} from "./EditForm.style";

interface WriteWordProps {
  setEngWord: Dispatch<SetStateAction<string>>;
  setKorWord: Dispatch<SetStateAction<string>>;
  engWord: string;
  korWord: string;
}

function WriteWord(props: WriteWordProps) {
  const { setEngWord, setKorWord, engWord, korWord } = props;
  return (
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
  );
}

export default WriteWord;
