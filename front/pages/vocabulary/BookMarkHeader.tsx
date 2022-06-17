import { FC, useState } from "react";
import {
  HeadUserWrapper,
  HeadWrapper,
  MainText,
  SwitchWrapper,
  SwitchButton,
  SwitchButtonInput,
  SwitchButtonText,
} from "./Vocabulary.styles";
import { Avatar, AvatarImage, UserName } from "../myPage/MyPage.style";

const BookMarkHeader: FC = () => {
  const [mainText, setMainText] = useState("내 단어장");
  const [checked, setChecked] = useState(false);
  const checkHandler = () => {
    setChecked(!checked);
    checked ? setMainText("내 단어장") : setMainText("북마크한 단어장");
  };
  return (
    <>
      <SwitchWrapper>
        <SwitchButtonText>내 단어장</SwitchButtonText>
        <SwitchButtonInput
          type={"checkbox"}
          id={"switch"}
          checked={checked}
          onChange={checkHandler}
        />
        <SwitchButton htmlFor={"switch"} $checked={checked}></SwitchButton>
        <SwitchButtonText>북마크한 단어장 </SwitchButtonText>
      </SwitchWrapper>
      <HeadWrapper>
        <HeadUserWrapper>
          <Avatar>
            <AvatarImage src="/logo.png" alt="Avatar" />
          </Avatar>
          <UserName>000님</UserName>
        </HeadUserWrapper>
        <MainText>{mainText}</MainText>
      </HeadWrapper>
    </>
  );
};

export default BookMarkHeader;
