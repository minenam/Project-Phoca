import React, {
  Dispatch,
  FC,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import { useIsLapTop } from "../../common/utils/useIsLapTop";
import {
  BtnWrapper,
  GridItem,
  GridTextItem,
  GridWrapper,
  LockBtn,
} from "./Vocabulary.styles";
import { MdPublic } from "react-icons/md";
import { FaLock, FaEdit } from "react-icons/fa";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { WordBook } from "../../common/types/resultsType";
import { shuffle } from "../../common/utils/shuffle";
import { WORD_IMAGES } from "../../common/utils/constant";
import Seo from "../../common/Seo";
import UserEditModal from "../user/UserEditModal";
import Modal from "../../common/modal/Modal";

interface itemProps {
  listItem: WordBook[] | undefined;
  trigger: Dispatch<SetStateAction<boolean>>;
}

const imageUrl = shuffle(WORD_IMAGES);

const wordBookChangeHandler = async (props: WordBook) => {
  const data = {
    wordbookName: props.wordbookName,
    secured: props.secured ? false : true,
  };
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/wordbook/${props.wordbookId}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
        body: JSON.stringify(data),
      },
    );
    if (!res.ok) throw new Error(res.statusText);

    const result = await res.json();
    return result;
  } catch (e) {
    console.error(e);
  }
};

const VocabularyItem: FC<itemProps> = ({ listItem, trigger }) => {
  const router = useRouter();
  const isLapTop = useIsLapTop();
  const [isEdit, setIsEdit] = useState(false);

  const VocaMutation = useMutation(wordBookChangeHandler, {
    onSuccess: (data) => {
      console.log("단어장 수정 성공", data);
      trigger(true);
      router.push("/vocabulary");
    },
    onError: (error) => {
      console.error("단어장 수정 실패", error);
    },
  });

  const vocaChangeHandler = (props: WordBook) => {
    VocaMutation.mutate(props);
  };

  const vocaClickHandler = (wordbookId: string) => {
    router.push(`/vocabulary/${wordbookId}`);
  };

  const editHandler = () => {
    setIsEdit(true);
  };

  const modalClose = () => {
    setIsEdit(false);
  };

  return (
    <GridWrapper $lapTop={isLapTop}>
      <Seo title="단어장" />
      {listItem != undefined && listItem?.length > 0 ? (
        listItem.map((item, idx) => {
          return (
            <GridItem
              $backgroundImage={imageUrl[idx % imageUrl.length]}
              key={item.createDate}>
              <BtnWrapper>
                <LockBtn onClick={() => vocaChangeHandler(item)}>
                  {item.secured ? <FaLock /> : <MdPublic />}
                </LockBtn>
                <LockBtn onClick={editHandler}>
                  <FaEdit />
                </LockBtn>
              </BtnWrapper>
              <GridTextItem onClick={() => vocaClickHandler(item.wordbookId)}>
                {item.wordbookName}
              </GridTextItem>
            </GridItem>
          );
        })
      ) : (
        <GridWrapper $without>단어장이 아직 없습니다</GridWrapper>
      )}
      {isEdit && (
        <Modal open={isEdit} width="500px" onClose={modalClose} large={true}>
          <UserEditModal onClose={modalClose} userInfo={user} />
        </Modal>
      )}
    </GridWrapper>
  );
};

export default VocabularyItem;
