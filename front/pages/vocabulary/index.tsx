import { NextPage } from "next";
import { VocabularyWrapper } from "../../components/vocabulary/Vocabulary.styles";
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "../../common/utils/constant";
import { useRouter } from "next/router";

import VocabularyMarkHeader from "../../components/vocabulary/VocabularyMarkHeader";
import VocabularyItem from "../../components/vocabulary/VocabularyItem";
import { useEffect, useState } from "react";
import { userStore } from "../../zustand/userStore";
import { useQuery } from "react-query";

interface wordBook {
  wordbookName: string;
  secured: boolean;
  userId: string;
  wordbookId: string;
  createDate: string;
}

const Vocabulary: NextPage = () => {
  const [vocaList, setVocaList] = useState<wordBook[] | undefined>([]);
  const [mainText, setMainText] = useState("내 단어장");
  const [checked, setChecked] = useState(false);
  const [isChange, setIsChange] = useState(false);

  const user = userStore((state) => state.user);

  const { data } = useQuery<wordBook[], Error>(
    ["wordbookList", user?.userId, checked],
    () => getVocaList(user?.userId),
  );

  async function getVocaList(userId?: string) {
    const res = await fetch(
      checked
        ? `${process.env.NEXT_PUBLIC_SERVER_URL}/bookmark/${userId}`
        : `${process.env.NEXT_PUBLIC_SERVER_URL}/wordbook/user/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      },
    );
    const result = await res.json();
    setIsChange(false);
    return result;
  }

  useEffect(() => {
    setVocaList(data);
  }, [data]);

  const checkHandler = () => {
    setChecked(!checked);
    checked ? setMainText("내 단어장") : setMainText("북마크한 단어장");
  };

  return (
    <VocabularyWrapper
      $sideBarWidth={`${SIDEBAR_WIDTH}`}
      $headerHeight={`${HEADER_HEIGHT}`}>
      <VocabularyMarkHeader
        checkHandler={checkHandler}
        mainText={mainText}
        inputChecked={checked}
        userInfo={user}
      />
      <VocabularyItem listItem={vocaList && vocaList} trigger={setIsChange} />
    </VocabularyWrapper>
  );
};

export default Vocabulary;
