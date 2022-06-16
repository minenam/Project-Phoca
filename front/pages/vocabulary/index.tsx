import { NextPage } from "next";
import {
  HeadWrapper,
  VocabularyWrapper,
  MainText,
  SwitchWrapper,
  SwitchButton,
  SwitchButtonText,
  SwitchButtonInput,
} from "./Vocabulary.styles";
import { Avatar, AvatarImage } from "../myPage/MyPage.style";
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "../../common/utils/constant";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

const Vocabulary: NextPage = () => {
  const router = useRouter();
  const [mainText, setMainText] = useState(
    router.pathname == "/vocabulary" ? "내 단어장" : "북마크 단어장",
  );
  const [checked, setChecked] = useState(false);

  const sideBarWidth = parseInt(SIDEBAR_WIDTH.substring(0, 3)) + 100;
  const headerHeight = parseInt(HEADER_HEIGHT.substring(0, 3)) + 30;

  return (
    <VocabularyWrapper
      $sideBarWidth={`${sideBarWidth}px`}
      $headerHeight={`${headerHeight}px`}>
      <SwitchWrapper>
        <SwitchButtonText>북마크한 단어장</SwitchButtonText>
        <SwitchButtonInput
          type={"checkbox"}
          id={"switch"}
          checked={checked}
          onChange={() => setChecked(!checked)}
        />
        <SwitchButton htmlFor={"switch"} $checked={checked}></SwitchButton>
        <SwitchButtonText>내 단어장</SwitchButtonText>
      </SwitchWrapper>
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
