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
  WrapperWithFooter,
} from "@guideComp/Guide.style";
import { HEADER_HEIGHT } from "@utils/constant";
import { useState } from "react";
import MenuList from "@guideComp/MenuList";
import GuideContent from "@guideComp/GuideContent";
import GuideFooter from "@guideComp/GuideFooter";

const Guide: NextPage = () => {
  const [selected, setSelected] = useState("");
  const headerHeight = parseInt(HEADER_HEIGHT.substring(0, 3)) + 120;
  return (
    <>
      <WrapperWithFooter $headerHeight={`${headerHeight}px`}>
        <GuideWrapper>
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
      </WrapperWithFooter>
      <GuideFooter />
    </>
  );
};

export default Guide;
