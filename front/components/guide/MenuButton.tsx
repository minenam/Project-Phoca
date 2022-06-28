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
    setOnClicked(true);
  };

  useEffect(() => {
    onClicked ? trigger(true) : trigger(false);
  }, [onClicked]);

  return (
    <MenuItem
      key={key}
      $clicked={onClicked ? true : false}
      onClick={menuItemClickHandler}>
      {text}
    </MenuItem>
  );
};

export default MenuButton;
