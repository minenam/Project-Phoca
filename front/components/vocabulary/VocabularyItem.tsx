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
import { FaLock } from "react-icons/fa";
import { useRouter } from "next/router";
import { useMutation, useQuery } from "react-query";
import { WordBook } from "../../common/types/resultsType";
import Toast from "../../common/toast/Toast";

interface itemProps {
  listItem: WordBook[] | undefined;
  trigger: Dispatch<SetStateAction<boolean>>;
}

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

const VocabularyItem: FC<itemProps> = ({ listItem, trigger }) => {
  const router = useRouter();
  const isLapTop = useIsLapTop();

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

  return (
    <>
      <GridWrapper $lapTop={isLapTop}>
        {listItem != undefined && listItem?.length > 0 ? (
          listItem.map((item) => {
            return (
              <GridItem key={item.createDate}>
                <BtnWrapper>
                  <LockBtn onClick={() => vocaChangeHandler(item)}>
                    {item.secured ? <FaLock /> : <MdPublic />}
                  </LockBtn>
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
        <Toast success={false} message={errorMsg} setErrorMsg={setErrorMsg} />
      )}
    </>
  );
};

export default VocabularyItem;
