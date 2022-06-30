import { useState } from "react";
import { useMutation, useQueryClient } from "react-query";
import { InputContainer, BtnContainer, Button } from "./Words.style";
import {
  Field,
  Label,
  Input,
} from "../../word/results/EditForm/EditForm.style";
import { Word } from "../../../common/types/wordType";

interface WordEditFormProps {
  wordId: string;
  wordbookId: string;
  onClose: () => void;
}

interface modifyWordValues {
  wordId: string;
  data: { wordbookId: string; wordEng: string[]; wordKor: string[] };
}

const modifyWord = async (props: modifyWordValues) => {
  const { wordId, data } = props;
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/word/${wordId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
      body: JSON.stringify(data),
    },
  );

  const result: Word = await res.json();
  return result;
};

function WordEditForm(props: WordEditFormProps) {
  const { wordId, wordbookId, onClose } = props;
  const queryClient = useQueryClient();

  const [engWord, setEngWord] = useState("");
  const [korWord, setKorWord] = useState("");

  const modifyWordMutation = useMutation(modifyWord, {
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries(["getWords", wordbookId]); // 단어 리스트 갱신
      onClose();
    },
  });

  const submitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const dataToSubmit: modifyWordValues = {
      wordId,
      data: {
        wordbookId,
        wordEng: [engWord],
        wordKor: [korWord],
      },
    };

    modifyWordMutation.mutate(dataToSubmit);
  };

  return (
    <>
      <InputContainer>
        <Field>
          <Label htmlFor="selectedEngWord">영어단어</Label>
          <Input
            id="selectedEngWord"
            name="selectedEngWord"
            type="text"
            placeholder="영어단어를 적어주세요."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setEngWord(e.target.value)
            }
            value={engWord}
          />
        </Field>
        <Field>
          <Label htmlFor="selectedKorWord">뜻</Label>
          <Input
            id="selectedKorWord"
            name="selectedKorWord"
            type="text"
            placeholder="뜻을 적어주세요."
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setKorWord(e.target.value)
            }
            value={korWord}
          />
        </Field>
      </InputContainer>
      <BtnContainer>
        <Button onClick={submitHandler}>변경하기</Button>
      </BtnContainer>
    </>
  );
}

export default WordEditForm;
