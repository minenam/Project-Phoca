import { NextPage } from "next";
import {
  ContentWrapper,
  GuideMenuWrapper,
  GuideWrapper,
  Hr,
  MainText,
  MenuRoot,
  MenuWrapper,
  TextContentWrapper,
  Title,
} from "../../components/guide/Guide.style";
import { HEADER_HEIGHT } from "../../common/utils/constant";
import { useRef, useState } from "react";
import MenuList from "../../components/guide/MenuList";
import GuideContent from "../../components/guide/GuideContent";

const Guide: NextPage = () => {
  const [selected, setSelected] = useState("");

  return (
    <GuideWrapper $headerHeight={HEADER_HEIGHT}>
      <GuideMenuWrapper>
        <ContentWrapper>
          <Title>학습 가이드</Title>
        </ContentWrapper>
        <MenuWrapper>
          <MenuRoot>
            <MenuList selected={selected} setSelected={setSelected} />
          </MenuRoot>
        </MenuWrapper>
      </GuideMenuWrapper>
      <Hr />
      <TextContentWrapper>
        <MainText>{selected}</MainText>
        <GuideContent selected={selected} />
      </TextContentWrapper>
    </GuideWrapper>
  );
};

export default Guide;
