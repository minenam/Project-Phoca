import { MAIN_BUTTON } from "../../common/utils/constant";
import { MenuItem } from "./Guide.style";
import { GuideMenuButtonProps } from "../../common/types/propsType";

const MenuList = ({ selected, setSelected }: GuideMenuButtonProps) => {
  const buttonClickHandler = (
    e: React.MouseEvent<HTMLLIElement>,
    name: string,
  ) => {
    setSelected(name);
  };

  return (
    <>
      {MAIN_BUTTON.map((item, idx) => {
        return (
          <>
            <MenuItem
              key={item.buttonName}
              $onClicked={selected === item.buttonName}
              onClick={(e) => buttonClickHandler(e, item.buttonName)}>
              {item.buttonName}
            </MenuItem>
          </>
        );
      })}
    </>
  );
};

export default MenuList;
