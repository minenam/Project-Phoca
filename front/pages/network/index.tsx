import { NextPage } from "next";
import VocabularyItem from "../vocabulary/VocabularyItem";
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "../../common/utils/constant";
import { VocabularyWrapper } from "../vocabulary/Vocabulary.styles";

const Network: NextPage = () => {
  const sideBarWidth = parseInt(SIDEBAR_WIDTH.substring(0, 3)) + 100;
  const headerHeight = parseInt(HEADER_HEIGHT.substring(0, 3)) + 30;

  return (
    <VocabularyWrapper
      $sideBarWidth={`${sideBarWidth}px`}
      $headerHeight={`${headerHeight}px`}>
      <VocabularyItem></VocabularyItem>
    </VocabularyWrapper>
  );
};

export default Network;
