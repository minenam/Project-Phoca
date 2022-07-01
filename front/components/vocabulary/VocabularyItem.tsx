import { Dispatch, FC, SetStateAction, useState, useEffect } from "react";
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
import { useMutation, useQuery, useQueryClient } from "react-query";
import { WordBook } from "../../common/types/resultsType";
import { shuffle } from "../../common/utils/shuffle";
import { WORD_IMAGES } from "../../common/utils/constant";
import Modal from "../../common/modal/Modal";
import Toast from "../../common/toast/Toast";
import VocabularyEditModal from "./VocabularyEditModal";
import { vocaKeys } from "../../common/querykeys/querykeys";
import { AiFillHeart } from "react-icons/ai";
import { BookMarkProps } from "../../common/types/propsType";
import { userStore } from "../../zustand/userStore";

interface itemProps {
  listItem: WordBook[] | undefined;
  isMine: boolean;
}

const imageUrl = shuffle(WORD_IMAGES);

const bookMarkHandler = async (props: BookMarkProps) => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/bookmark`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
      },
      body: JSON.stringify({
        userId: props.userId,
        wordbookId: props.wordbookId,
      }),
    });
    return res;
  } catch (e) {
    console.error(e);
  }
};

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

// 단어장의 단어 개수 받아오는 핸들러
const checkWordsCount = async (wordbookId: string) => {
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
};

const VocabularyItem: FC<itemProps> = ({ listItem, isMine }) => {
  const router = useRouter();
  const isLapTop = useIsLapTop();
  const [isEdit, setIsEdit] = useState(false);
  const [clickedItem, setClickedItem] = useState("");

  const user = userStore((state) => state.user);
  const url = router.asPath;
  const queryClient = useQueryClient();

  const [selectedWordbookId, setSelectedWordbookId] = useState(""); // 선택된 단어장 아이디
  const [errorMsg, setErrorMsg] = useState(""); // 에러 메세지

  // 단어장 정보 받아오기
  const { data, isSuccess } = useQuery(
    ["getWordsCount", selectedWordbookId],
    () => checkWordsCount(selectedWordbookId),
    {
      enabled: !!selectedWordbookId,
    },
  );

  const bookMarkMutation = useMutation(bookMarkHandler, {
    onSuccess: (data) => {
      console.log("단어장 삭제 성공", data);
      queryClient.invalidateQueries([vocaKeys.getAll]);
    },
    onError: (error) => {
      console.error("단어장 수정 실패", error);
    },
  });

  const VocaMutation = useMutation(wordBookChangeHandler, {
    onSuccess: (data) => {
      console.log("단어장 수정 성공", data);
      queryClient.invalidateQueries([vocaKeys.getAll]);
    },
    onError: (error) => {
      console.error("단어장 수정 실패", error);
    },
  });

  const vocaChangeHandler = (props: WordBook) => {
    VocaMutation.mutate(props);
  };

  // 단어장에 저장된 단어가 없을 경우 처리
  useEffect(() => {
    if (isSuccess && data.wordCount > 0) {
      router.push({
        pathname: `/vocabulary/${selectedWordbookId}`,
        query: { returnUrl: router.asPath },
      });
    } else if (isSuccess && data.wordCount === 0) {
      setErrorMsg("단어장에 저장된 단어가 없습니다.");
    }
  }, [data, isSuccess, router, selectedWordbookId]);

  const editHandler = (
    e: React.MouseEvent<HTMLDivElement>,
    wordbookId: string,
  ) => {
    setIsEdit(true);
    setClickedItem(wordbookId);
  };

  const modalClose = () => {
    setIsEdit(false);
  };

  return (
    <>
      <GridWrapper $lapTop={isLapTop}>
        {listItem != undefined && listItem?.length > 0 ? (
          listItem.map((item, idx) => {
            return (
              <GridItem
                key={item.createDate}
                $backgroundImage={imageUrl[idx % imageUrl.length]}>
                <BtnWrapper>
                  {!isMine ? (
                    <>
                      <LockBtn onClick={() => vocaChangeHandler(item)}>
                        {item.secured ? <FaLock /> : <MdPublic />}
                      </LockBtn>
                      <LockBtn onClick={(e) => editHandler(e, item.wordbookId)}>
                        <FaEdit />
                      </LockBtn>
                    </>
                  ) : (
                    <LockBtn
                      onClick={() =>
                        bookMarkMutation.mutate({
                          wordbookId: item.wordbookId,
                          userId: user?.userId,
                        })
                      }>
                      <AiFillHeart />
                    </LockBtn>
                  )}
                </BtnWrapper>
                <GridTextItem
                  onClick={() => setSelectedWordbookId(item.wordbookId)}>
                  {item.wordbookName}
                </GridTextItem>
              </GridItem>
            );
          })
        ) : (
          <GridWrapper $without>단어장이 아직 없습니다</GridWrapper>
        )}
      </GridWrapper>
      {!!errorMsg && (
        <Toast
          success={false}
          message={errorMsg}
          url={url}
          setErrorMsg={setErrorMsg}
        />
      )}
      {isEdit && (
        <Modal
          open={isEdit}
          width="500px"
          onClose={modalClose}
          large={true}
          url={url}>
          <VocabularyEditModal
            onClose={modalClose}
            wordbookInfo={clickedItem}
          />
        </Modal>
      )}
    </>
  );
};

export default VocabularyItem;
