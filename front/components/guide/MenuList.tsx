import { FC, useState } from "react";
import { MAIN_BUTTON } from "../../common/utils/constant";
import { MenuItem } from "./Guide.style";
import MenuButton from "./MenuButton";

const MenuList = () => {
  const [trigger, setTrigger] = useState(false);

  return (
    <>
      {MAIN_BUTTON.map((item, idx) => {
        return (
          <MenuButton
            key={item.buttonName}
            text={item.buttonName}
            trigger={setTrigger}
            cancelClicked={trigger ? true : false}
          />
        );
      })}
    </>
  );
};

export default MenuList;
