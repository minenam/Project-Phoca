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
} from "../../components/guide/Guide.style";
import { HEADER_HEIGHT } from "../../common/utils/constant";
import { useRef, useState } from "react";
import MenuList from "../../components/guide/MenuList";
import GuideContent from "../../components/guide/GuideContent";
import GuideFooter from "../../components/guide/GuideFooter";

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
