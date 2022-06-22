import { NextPage } from "next";
import { VocabularyWrapper } from "./Vocabulary.styles";
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "../../common/utils/constant";
import { useRouter } from "next/router";

import VocabularyMarkHeader from "./VocabularyMarkHeader";
import VocabularyItem from "./VocabularyItem";
import { useEffect, useState } from "react";
import { userStore } from "../../zustand/store";

const Vocabulary: NextPage = () => {
  const [vocaList, setVocaList] = useState([]);
  const [mainText, setMainText] = useState("내 단어장");
  const [checked, setChecked] = useState(false);

  const user = userStore();
  const sideBarWidth = parseInt(SIDEBAR_WIDTH.substring(0, 3)) + 100;
  const headerHeight = parseInt(HEADER_HEIGHT.substring(0, 3)) + 30;

  useEffect(() => {
    //라우터 따라서 요청 보내는 거 바꾸기
  }, []);

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
      />
      <VocabularyItem />
    </VocabularyWrapper>
  );
};

export default Vocabulary;
