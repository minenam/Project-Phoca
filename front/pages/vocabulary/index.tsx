import { NextPage } from "next";
import {
  HeadWrapper,
  VocabularyWrapper,
  Avatar,
  AvatarImage,
  MainText,
} from "./Vocabulary.styles";
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "../../common/utils/constant";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Vocabulary: NextPage = () => {
  const router = useRouter();
  const [mainText, setMainText] = useState(
    router.pathname == "/vocabulary" ? "내 단어장" : "북마크 단어장",
  );
  const sideBarWidth = parseInt(SIDEBAR_WIDTH.substring(0, 3)) + 100;
  const headerHeight = parseInt(HEADER_HEIGHT.substring(0, 3)) + 30;

  return (
    <VocabularyWrapper
      $sideBarWidth={`${sideBarWidth}px`}
      $headerHeight={`${headerHeight}px`}>
      <HeadWrapper>
        <Avatar>
          <AvatarImage src="/logo.png" alt="Avatar" />
        </Avatar>
        <MainText>{mainText}</MainText>
      </HeadWrapper>
    </VocabularyWrapper>
  );
};

export default Vocabulary;
