import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { BtnContainer, Button } from "./EditForm.style";
import SelectWord from "./SelectWord";
import WriteWord from "./WriteWord";

interface EditFormProps {
  imageUrl: string;
  onClose: () => void;
  setEngWord: Dispatch<SetStateAction<string>>;
  setKorWord: Dispatch<SetStateAction<string>>;
  engWordList: string[];
  korWordList: string[];
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
  engWordList,
  korWordList,
}: EditFormProps) {
  const [selectedEngWord, setSelectedEngWord] = useState("");
  const [selectedKorWord, setSelectedKorWord] = useState("");
  const [wordList, setWordList] = useState<Data[]>([]);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setEngWord(selectedEngWord);
    setKorWord(selectedKorWord);
    onClose();
  };

  useEffect(() => {
    const temp = [];
    for (let i = 0; i < engWordList.length; i++) {
      temp.push({ engWord: engWordList[i], korWord: korWordList[i] });
    }
    setWordList(temp);
  }, []);

  return (
    <>
      <SelectWord
        data={wordList}
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
