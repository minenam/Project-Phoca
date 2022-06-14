import React from "react";
import { useStyletron } from "styletron-react";
import { MAIN_BUTTON, HEADER_HEIGHT } from "../../common/utils/constant";
import { SideBarContainer, SideBarBtn } from "./SideBar.style";

function SideBar() {
  const [css] = useStyletron();

  return (
    <SideBarContainer>
      {MAIN_BUTTON.map((item, idx) => (
        <SideBarBtn
          key={item.buttonName}
          className={css({
            backgroundColor: item.buttonColor,
          })}
          $headerHeight={HEADER_HEIGHT}>
          {item.buttonName}
        </SideBarBtn>
      ))}
    </SideBarContainer>
  );
}

export default SideBar;
