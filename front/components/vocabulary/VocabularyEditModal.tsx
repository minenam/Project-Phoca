import { VocabularyModalProps } from "../../common/types/propsType";
import { EditTile, VocaEditModalWrapper } from "./modal/VocabularyModal.style";
import {
  Comment,
  EditButton,
  InputWrapper,
  EditButtonWrapper,
} from "../user/UserEditModal.style";
import React, { useEffect, useState } from "react";
import { useQueryClient, useMutation, useQuery } from "react-query";
import { Wordbook } from "../../common/booklist/BookList";
import { vocaKeys } from "../../common/querykeys/querykeys";
import { useRouter } from "next/router";

const getVocaInfo = async (wordbookId: string) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/wordbook/single/${wordbookId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      },
    );

    const result = await res.json();
    return result;
  } catch (e) {
    console.error(e);
  }
};

const VocabularyEditModal = ({
  onClose,
  wordbookInfo,
}: VocabularyModalProps) => {
  const [name, setName] = useState("");
  const [wordbookData, setWordbookData] = useState<Wordbook>();
  const queryClient = useQueryClient();
  const router = useRouter();

  const submitHandler = async () => {
    const data = {
      wordbookName: name,
      secured: wordbookData?.secured,
    };
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/wordbook/${wordbookData?.wordbookId}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
          body: JSON.stringify(data),
        },
      );
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return await res.json();
    } catch (e) {
      console.error(e);
    }
  };

  const deleteHandler = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/wordbook/${wordbookInfo}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
          },
        },
      );
      if (!res.ok) {
        throw new Error(res.statusText);
      }
      return await res;
    } catch (e) {
      console.error("단어장 삭제 실패", e);
    }
  };

  const { data } = useQuery([vocaKeys.detail(wordbookInfo)], () =>
    getVocaInfo(wordbookInfo),
  );

  const vocaNameEditMutation = useMutation(submitHandler, {
    onSuccess: (data) => {
      onClose();
      queryClient.invalidateQueries();
    },
    onError: (err) => {
      console.error("단어장 정보 수정 실패", err);
    },
  });
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.currentTarget.value);
  };

  const vocaDelMutation = useMutation(deleteHandler, {
    onSuccess: (data) => {
      onClose();
      queryClient.invalidateQueries([vocaKeys.getAll]);
    },
    onError: (err) => {
      console.error("단어장 삭제 실패", err);
    },
  });

  useEffect(() => {
    if (data) {
      setWordbookData(data);
      setName(data.wordbookName);
    }
  }, [data]);

  return (
    <VocaEditModalWrapper>
      <EditTile>단어장 수정하기</EditTile>
      <InputWrapper>
        <label htmlFor="vocaName">단어장이름 :</label>
        <Comment
          id="vocaName"
          type="text"
          value={name}
          onChange={onChangeHandler}
        />
      </InputWrapper>
      <EditButtonWrapper>
        <EditButton
          $borderColor="#48cfc8"
          onClick={() => vocaNameEditMutation.mutate()}>
          수정완료
        </EditButton>
        <EditButton
          $borderColor="#FE7394"
          onClick={() => vocaDelMutation.mutate()}>
          단어장 삭제
        </EditButton>
      </EditButtonWrapper>
    </VocaEditModalWrapper>
  );
};

export default VocabularyEditModal;
