import { useRouter } from "next/router";
import { useState } from "react";
import { useMutation } from "react-query";
import { userStore } from "../../../../zustand/userStore";
import { BtnContainer, Button } from "../EditForm/EditForm.style";
import { AddBookBtn } from "./SaveForm.style";
import { AiOutlinePlusCircle } from "react-icons/ai";
import AddForm from "./AddForm";
import BookList, { Wordbook } from "../../../../common/booklist/BookList";

interface SaveFormProps {
  onClose: () => void;
  wordId: string;
  engWord: string;
  korWord: string;
}

interface SubmitValues {
  wordId: string;
  wordEng: string[];
  wordKor: string[];
  wordbookId: string;
}

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

  return (
    <>
      <BookList
        title="단어장 저장"
        height="250px"
        wordbookList={wordbookList}
        selectedWordbookId={selectedWordbookId}
        setWordbookList={setWordbookList}
        setSelectedWordbookId={setSelectedWordbookId}
      />
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
