import { MAIN_BUTTON } from "@utils/constant";
import { GuideMenuButtonProps } from "@common/types/propsType";
import { MenuItem } from "./Guide.style";
import { useEffect } from "react";

const MenuList = ({ selected, setSelected }: GuideMenuButtonProps) => {
  const buttonClickHandler = (
    e: React.MouseEvent<HTMLLIElement>,
    name: string,
  ) => {
    setSelected(name);
  };

  useEffect(() => {
    selected === "" && setSelected("단어장 만들기");
  }, [selected, setSelected]);

  return (
    <>
      {MAIN_BUTTON.map((item) => {
        return (
          <MenuItem
            key={item.buttonName}
            $onClicked={selected === item.buttonName}
            onClick={(e) => buttonClickHandler(e, item.buttonName)}>
            {item.buttonName}
          </MenuItem>
        );
      })}
    </>
  );
};

export default MenuList;
