import { NextPage } from "next";
import {
  ContentWrapper,
  GuideWrapper,
  MenuItem,
  MenuRoot,
  MenuWrapper,
  Title,
} from "../../components/guide/Guide.style";
import { HEADER_HEIGHT, MAIN_BUTTON } from "../../common/utils/constant";
import { useRef, useState } from "react";

const Guide: NextPage = () => {
  const [menuClicked, setMenuClicked] = useState(false);
  const menuRef = useRef<(HTMLLIElement | null)[]>([]);

  const menuItemClickHandler = (
    e: React.MouseEvent<HTMLLIElement>,
    idx: number,
  ) => {
    console.log("menuRef.current[idx]", menuRef.current[idx]);
  };

  return (
    <GuideWrapper $headerHeight={HEADER_HEIGHT}>
      <ContentWrapper>
        <Title>학습 가이드</Title>
      </ContentWrapper>
      <MenuWrapper>
        <MenuRoot>
          {MAIN_BUTTON.map((item, idx) => {
            return (
              <MenuItem
                $clicked={menuRef.current[idx] ? true : false}
                ref={(ref) => (menuRef.current[idx] = ref)}
                onClick={(e) => menuItemClickHandler(e, idx)}>
                {item.buttonName}
              </MenuItem>
            );
          })}
        </MenuRoot>
      </MenuWrapper>
    </GuideWrapper>
  );
};

export default Guide;
