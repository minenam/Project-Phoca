import { useState } from "react";
import { BtnContainer, Button } from "./EditForm.style";
import SelectWord from "./SelectWord";
import WriteWord from "./WriteWord";

interface EditFormProps {
  imageUrl?: string;
  onClose: () => void;
}

export interface Data {
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

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    console.log(engWord, korWord);
  };

  return (
    <>
      <SelectWord
        data={fakeData}
        imageUrl={imageUrl}
        setEngWord={setEngWord}
        setKorWord={setKorWord}
        engWord={engWord}
      />
      <WriteWord
        setEngWord={setEngWord}
        setKorWord={setKorWord}
        engWord={engWord}
        korWord={korWord}
      />
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
