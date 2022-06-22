import { useState, useEffect } from "react";
import {
  ListContainer,
  ItemContainer,
  BtnContainer,
  Button,
} from "../EditForm/EditForm.style";
import {
  SelectBookContainer,
  Title,
  Label,
  AddBookBtn,
} from "./SaveForm.style";
import { AiOutlinePlusCircle, AiFillLock } from "react-icons/ai";
import { MdPublic } from "react-icons/md";
import AddForm from "./AddForm";

interface SaveFormProps {
  onClose: () => void;
}

export interface Vocabulary {
  name: string;
  private: boolean;
}

const fakeData: Vocabulary[] = [
  {
    name: "단어장 1",
    private: false,
  },
  {
    name: "단어장 2",
    private: true,
  },
  {
    name: "단어장 3",
    private: false,
  },
  {
    name: "단어장 4",
    private: false,
  },
];

function SaveForm({ onClose }: SaveFormProps) {
  const [vocabularies, setVocabularies] = useState<Vocabulary[]>(fakeData);
  const [selectedVocabulary, setSelectedVocabulary] = useState<Vocabulary>({
    name: "",
    private: false,
  });
  const [addFormOpen, setAddFormOpen] = useState(false);

  const checkboxClickHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const selected = vocabularies.filter((item, idx) => idx === Number(value));
    if (selected) {
      setSelectedVocabulary(selected[0]);
    }
  };

  useEffect(() => {
    console.log(selectedVocabulary);
  }, [selectedVocabulary]);

  return (
    <>
      <SelectBookContainer>
        <Title>단어장 저장</Title>
        <ListContainer $height="250px">
          {vocabularies.map((item, idx) => (
            <ItemContainer key={item.name}>
              <input
                type="checkbox"
                name="word"
                value={idx}
                checked={item.name === selectedVocabulary.name}
                onChange={checkboxClickHandler}
              />
              <Label>{item.name}</Label>
              <Label>{item.private ? <AiFillLock /> : <MdPublic />}</Label>
            </ItemContainer>
          ))}
        </ListContainer>
      </SelectBookContainer>
      <AddBookBtn onClick={() => setAddFormOpen((cur) => !cur)}>
        <AiOutlinePlusCircle /> 새 단어장 추가
      </AddBookBtn>
      {addFormOpen && <AddForm setVocabularies={setVocabularies} />}
      <BtnContainer>
        <Button type="submit">저장하기</Button>
        <Button onClick={onClose}>취소하기</Button>
      </BtnContainer>
    </>
  );
}

export default SaveForm;
