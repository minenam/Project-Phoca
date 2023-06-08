import { useMutation, useQueryClient } from "react-query";
import { ConfirmContainer, BtnContainer, DelFormBtn } from "./Words.style";

interface WordDelFormProps {
  wordId: string;
  wordbookId: string;
  onClose: () => void;
}

const delWord = async (wordId: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/word/${wordId}`,
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
    },
  );
  if (!res.ok) {
    throw new Error("단어를 삭제하는데 실패했습니다.");
  }
  const result: string = await res.text();
  return result;
};

function WordDelForm({ wordId, wordbookId, onClose }: WordDelFormProps) {
  const queryClient = useQueryClient();

  const delWordMutation = useMutation(delWord, {
    onSuccess: (data, variables) => {
      onClose();
      queryClient.invalidateQueries(["getWords", wordbookId]); // 단어 리스트 갱신
    },
    onError: (err) => {
      console.log("err: ", err);
    },
  });

  const delBtnClickHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    delWordMutation.mutate(wordId);
  };

  return (
    <ConfirmContainer>
      정말 삭제하시겠습니까?
      <BtnContainer>
        <DelFormBtn $isDelBtn onClick={delBtnClickHandler}>
          삭제
        </DelFormBtn>
        <DelFormBtn onClick={onClose}>취소</DelFormBtn>
      </BtnContainer>
    </ConfirmContainer>
  );
}

export default WordDelForm;
