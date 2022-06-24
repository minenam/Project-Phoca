import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useQuery, useMutation } from "react-query";
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
  wordId: string;
  engWord: string;
  korWord: string;
}

interface Wordbook {
  wordbookId: string;
  wordbookName: string;
  secured: boolean;
}

interface SubmitValues {
  wordId: string;
  wordEng: string[];
  wordKor: string[];
  wordbookId: string;
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

// 최종 단어를 정해 수정 요청을 보냄
const patchWord = async (data: SubmitValues) => {
  const { wordId, wordEng, wordKor, wordbookId } = data;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/word/${wordId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
      body: JSON.stringify({ wordbookId, wordEng, wordKor }),
    },
  );
  if (!res.ok) {
    throw new Error("잠시 후 다시 시도해 주세요.");
  }
  const result = await res.json();
  return result;
};

function SaveForm({ onClose, wordId, engWord, korWord }: SaveFormProps) {
  const router = useRouter();
  const user = userStore((state) => state.user);
  const { data } = useQuery("wordbookList", () =>
    getWordbookList(user?.userId),
  );
  const patchWordMutation = useMutation(patchWord, {
    onSuccess: (data, variables) => {
      router.push("/myPage");
    },
    onError: (err) => {
      console.log(err);
    },
  });

  const [wordbookList, setWordbookList] = useState<Wordbook[]>([]); // 단어장 리스트를 저장
  const [selectedWordbookId, setSelectedWordbookId] = useState(""); // 선택된 단어장 Id를 저장
  const [addFormOpen, setAddFormOpen] = useState(false); // 새 단어장 추가 폼의 열림 상태를 저장

  // 기존 리스트에서 단어장을 선택할 수 있는 checkbox 핸들러
  const checkboxClickHandler = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.currentTarget;
    const selected = wordbookList.filter((item, idx) => idx === Number(value));
    if (selected) {
      setSelectedWordbookId(selected[0].wordbookId);
    }
  };

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const dataToSubmit = {
      wordId,
      wordEng: [engWord],
      wordKor: [korWord],
      wordbookId: selectedWordbookId,
    };
    patchWordMutation.mutate(dataToSubmit);
  };

  useEffect(() => {
    setWordbookList(data);
    if (data) {
      setSelectedWordbookId(data[0].wordbookId);
    }
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
                checked={item.wordbookId === selectedWordbookId}
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
        <Button type="submit" onClick={handleSubmit}>
          저장하기
        </Button>
        <Button onClick={onClose}>취소하기</Button>
      </BtnContainer>
    </>
  );
}

export default SaveForm;
