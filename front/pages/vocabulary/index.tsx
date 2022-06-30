import { NextPage } from "next";
import { VocabularyWrapper } from "../../components/vocabulary/Vocabulary.styles";
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "../../common/utils/constant";
import VocabularyMarkHeader from "../../components/vocabulary/VocabularyMarkHeader";
import VocabularyItem from "../../components/vocabulary/VocabularyItem";
import { useEffect, useState } from "react";
import { userStore } from "../../zustand/userStore";
import { useQuery } from "react-query";
import { WordBook, BookMark } from "../../common/types/resultsType";

const Vocabulary: NextPage = () => {
  const [vocaList, setVocaList] = useState<WordBook[] | undefined>([]);
  const [mainText, setMainText] = useState("내 단어장");
  const [checked, setChecked] = useState(false);
  const [isChange, setIsChange] = useState(false);

  const user = userStore((state) => state.user);

  const { data } = useQuery<WordBook[], Error>(
    ["wordbookList", user?.userId, checked, isChange],
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
    let bookmark: WordBook[] = [];
    checked && result.map((item: BookMark) => bookmark.push(item.wordbook));
    setIsChange(false);
    return checked ? bookmark : result;
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
