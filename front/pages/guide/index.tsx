import { NextPage } from "next";
import {
  ContentWrapper,
  GuideWrapper,
  MenuItem,
  MenuRoot,
  MenuWrapper,
  Title,
} from "../../components/guide/Guide.style";
import { HEADER_HEIGHT } from "../../common/utils/constant";
import { useRef, useState } from "react";
import MenuList from "../../components/guide/MenuList";

const Guide: NextPage = () => {
  const [selected, setSelected] = useState("");

  return (
    <GuideWrapper $headerHeight={HEADER_HEIGHT}>
      <ContentWrapper>
        <Title>학습 가이드</Title>
      </ContentWrapper>
      <MenuWrapper>
        <MenuRoot>
          <MenuList selected={selected} setSelected={setSelected} />
        </MenuRoot>
      </MenuWrapper>
    </GuideWrapper>
  );
};

export default Guide;
