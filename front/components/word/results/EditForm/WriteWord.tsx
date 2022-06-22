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
  setSelectedEngWord: Dispatch<SetStateAction<string>>;
  setSelectedKorWord: Dispatch<SetStateAction<string>>;
  selectedEngWord: string;
  selectedKorWord: string;
}

function WriteWord(props: WriteWordProps) {
  const {
    setSelectedEngWord,
    setSelectedKorWord,
    selectedEngWord,
    selectedKorWord,
  } = props;
  return (
    <WriteWordContainer>
      <InfoTitle>원하는 단어가 없다면 직접 적어주세요!</InfoTitle>
      <InfoLine />
      <InputContainer>
        <Field>
          <Label htmlFor="selectedEngWord">영어단어</Label>
          <Input
            id="selectedEngWord"
            name="selectedEngWord"
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSelectedEngWord(e.target.value)
            }
            value={selectedEngWord}
          />
        </Field>
        <Field>
          <Label htmlFor="selectedKorWord">뜻</Label>
          <Input
            id="selectedKorWord"
            name="selectedKorWord"
            type="text"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setSelectedKorWord(e.target.value)
            }
            value={selectedKorWord}
          />
        </Field>
      </InputContainer>
    </WriteWordContainer>
  );
}

export default WriteWord;
