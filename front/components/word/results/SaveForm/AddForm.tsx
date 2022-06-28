import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { AiFillLock } from "react-icons/ai";
import { MdPublic } from "react-icons/md";
import { AddFormContainer, Input, IconButton, Button } from "./SaveForm.style";

interface AddFormProps {
  userId: string | undefined;
}

interface NewWordbook {
  userId: string | undefined;
  wordbookName: string;
  secured: boolean;
}

const addWordbook = async (data: NewWordbook) => {
  const { userId, wordbookName, secured } = data;

  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/wordbook/create/${userId}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
      body: JSON.stringify({ wordbookName, secured }),
    },
  );

  if (!res.ok) {
    throw new Error("단어장 추가 실패");
  }

  const result = await res.json();
  return result;
};

function AddForm({ userId }: AddFormProps) {
  const queryClient = useQueryClient();

  const [wordbookName, setWordbookName] = useState(""); // 단어장 이름
  const [isPrivate, setIsPrivate] = useState(false); // 단어장 공개 여부

  const addWordBookMutation = useMutation(addWordbook, {
    onSuccess: () => {
      queryClient.invalidateQueries("wordbookList"); // 단어장 리스트 갱신
    },
    onError: (err) => {
      console.log(err);
    },
  });

  // 단어장 추가 버튼 클릭 핸들러
  const addBtnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const newWordbook = { userId, wordbookName, secured: isPrivate };
    addWordBookMutation.mutate(newWordbook);
  };

  return (
    <AddFormContainer>
      <Input
        type="text"
        name="wordBookName"
        value={wordbookName}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setWordbookName(e.target.value)
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
