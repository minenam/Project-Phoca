import { useEffect, useState } from "react";
import { MenuItem } from "./Guide.style";
import { GuideMenuButtonProps } from "../../common/types/propsType";

const MenuButton = ({
  key,
  text,
  trigger,
  cancelClicked,
}: GuideMenuButtonProps) => {
  const [onClicked, setOnClicked] = useState(false);

  const menuItemClickHandler = (e: React.MouseEvent) => {
    setOnClicked(cancelClicked);
  };

  useEffect(() => {
    onClicked ? trigger(true) : trigger(false);
  }, [onClicked]);

  return (
    <MenuItem
      key={key}
      className={`${onClicked ? "clicked" : ""}`}
      $style={{
        height: onClicked ? "250px" : "85px",
        transition: onClicked ? "height 0.5 ease" : "",
      }}
      onClick={(e) => menuItemClickHandler(e)}>
      {text}
    </MenuItem>
  );
};

export default MenuButton;
