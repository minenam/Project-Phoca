import { useState, useEffect } from "react";
import { useQuery } from "react-query";
import { userStore } from "../../../../zustand/userStore";
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

interface Wordbook {
  wordbookId: string;
  wordbookName: string;
  secured: boolean;
}

// 해당 유저의 단어장 리스트를 가져옴
const getWordbookList = async (userId: string | undefined) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/wordbook/user/${userId}`,
    {
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    },
  );
  const result = await res.json();
  return result;
};

function SaveForm({ onClose }: SaveFormProps) {
  const user = userStore((state) => state.user);
  const { data } = useQuery("wordbookList", () =>
    getWordbookList(user?.userId),
  );

  const [wordbookList, setWordbookList] = useState<Wordbook[]>([]); // 단어장 리스트를 저장
  const [selectedWordbook, setSelectedWordbook] = useState<Wordbook>({
    wordbookId: "",
    wordbookName: "",
    secured: false,
  }); // 선택된 단어장을 저장
  const [addFormOpen, setAddFormOpen] = useState(false); // 새 단어장 추가 폼의 열림 상태를 저장

  // 기존 리스트에서 단어장을 선택할 수 있는 checkbox 핸들러
  const checkboxClickHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const selected = wordbookList.filter((item, idx) => idx === Number(value));
    if (selected) {
      setSelectedWordbook(selected[0]);
    }
  };

  useEffect(() => {
    console.log(selectedWordbook);
  }, [selectedWordbook]);

  useEffect(() => {
    setWordbookList(data);
  }, [data]);

  return (
    <>
      <SelectBookContainer>
        <Title>단어장 저장</Title>
        <ListContainer $height="250px">
          {wordbookList?.map((item, idx) => (
            <ItemContainer key={item.wordbookName}>
              <input
                type="checkbox"
                name="word"
                value={idx}
                checked={item.wordbookName === selectedWordbook.wordbookName}
                onChange={checkboxClickHandler}
              />
              <Label>{item.wordbookName}</Label>
              <Label>{item.secured ? <AiFillLock /> : <MdPublic />}</Label>
            </ItemContainer>
          ))}
        </ListContainer>
      </SelectBookContainer>
      <AddBookBtn onClick={() => setAddFormOpen((cur) => !cur)}>
        <AiOutlinePlusCircle /> 새 단어장 추가
      </AddBookBtn>
      {addFormOpen && <AddForm userId={user?.userId} />}
      <BtnContainer>
        <Button type="submit">저장하기</Button>
        <Button onClick={onClose}>취소하기</Button>
      </BtnContainer>
    </>
  );
}

export default SaveForm;
