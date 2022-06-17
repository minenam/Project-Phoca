import { NextPage } from "next";
import { VocabularyWrapper } from "./Vocabulary.styles";
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "../../common/utils/constant";
import { useRouter } from "next/router";

import VocabularyMarkHeader from "./VocabularyMarkHeader";
import VocabularyItem from "./VocabularyItem";

const Vocabulary: NextPage = () => {
  const sideBarWidth = parseInt(SIDEBAR_WIDTH.substring(0, 3)) + 100;
  const headerHeight = parseInt(HEADER_HEIGHT.substring(0, 3)) + 30;

  return (
    <VocabularyWrapper
      $sideBarWidth={`${sideBarWidth}px`}
      $headerHeight={`${headerHeight}px`}>
      <VocabularyMarkHeader />
      <VocabularyItem />
    </VocabularyWrapper>
  );
};

export default Vocabulary;
