import React from "react";
import { useStyletron } from "styletron-react";
import { MAIN_BUTTON } from "../../common/utils/uils";
import { SideBarContainer, SideBarBtn } from "./SideBar.style";

function SideBar() {
  const [css] = useStyletron();

  return (
    <SideBarContainer>
      {MAIN_BUTTON.map((item, idx) => (
        <SideBarBtn
          key={idx}
          className={css({
            backgroundColor: item.buttonColor,
          })}>
          {item.buttonName}
        </SideBarBtn>
      ))}
    </SideBarContainer>
  );
}

export default SideBar;
