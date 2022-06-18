import { useState, Dispatch, SetStateAction } from "react";
import { BtnContainer, Button } from "./EditForm.style";
import SelectWord from "./SelectWord";
import WriteWord from "./WriteWord";

interface EditFormProps {
  imageUrl?: string;
  onClose: () => void;
  setEngWord: Dispatch<SetStateAction<string>>;
  setKorWord: Dispatch<SetStateAction<string>>;
}

export interface Data {
  engWord: string;
  korWord: string;
}

function EditForm({
  imageUrl,
  onClose,
  setEngWord,
  setKorWord,
}: EditFormProps) {
  const [selectedEngWord, setSelectedEngWord] = useState("");
  const [selectedKorWord, setSelectedKorWord] = useState("");

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
    setEngWord(selectedEngWord);
    setKorWord(selectedKorWord);
    onClose();
  };

  return (
    <>
      <SelectWord
        data={fakeData}
        imageUrl={imageUrl}
        setSelectedEngWord={setSelectedEngWord}
        setSelectedKorWord={setSelectedKorWord}
        selectedEngWord={selectedEngWord}
      />
      <WriteWord
        setSelectedEngWord={setSelectedEngWord}
        setSelectedKorWord={setSelectedKorWord}
        selectedEngWord={selectedEngWord}
        selectedKorWord={selectedKorWord}
      />
      <BtnContainer>
        <Button
          type="submit"
          onClick={handleSubmit}
          disabled={selectedEngWord === "" || selectedKorWord === ""}>
          저장하기
        </Button>
        <Button onClick={onClose}>취소하기</Button>
      </BtnContainer>
    </>
  );
}

export default EditForm;
