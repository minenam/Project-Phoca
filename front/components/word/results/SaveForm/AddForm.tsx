import { useState, Dispatch, SetStateAction } from "react";
import { AiFillLock } from "react-icons/ai";
import { MdPublic } from "react-icons/md";
import { AddFormContainer, Input, IconButton, Button } from "./SaveForm.style";
import { Vocabulary } from "./SaveForm";

interface SelectWordProps {
  setVocabularies: Dispatch<SetStateAction<Vocabulary[]>>;
}

function AddForm(props: SelectWordProps) {
  const { setVocabularies } = props;
  const [wordBookName, setWordBookName] = useState("");
  const [isPrivate, setIsPrivate] = useState(false);

  const addBtnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    setVocabularies((cur) => [
      ...cur,
      { name: wordBookName, private: isPrivate },
    ]);
  };

  return (
    <AddFormContainer>
      <Input
        type="text"
        name="wordBookName"
        value={wordBookName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setWordBookName(e.target.value)
        }
        placeholder="단어장 이름"
      />
      <IconButton onClick={() => setIsPrivate((cur) => !cur)}>
        {isPrivate ? <AiFillLock /> : <MdPublic />}
      </IconButton>
      <Button onClick={addBtnClickHandler}>추가</Button>
    </AddFormContainer>
  );
}

export default AddForm;
