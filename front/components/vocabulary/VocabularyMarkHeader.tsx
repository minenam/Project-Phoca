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
import { Avatar, AvatarImage, UserName } from "../../pages/myPage/MyPage.style";

interface Iprops {
  checkHandler: () => void;
  mainText: string;
  inputChecked: boolean;
  userName: string | undefined;
}

function VocabularyMarkHeader({
  checkHandler,
  mainText,
  inputChecked,
  userName,
}: Iprops): JSX.Element {
  return (
    <>
      <SwitchWrapper>
        <SwitchButtonText>내 단어장</SwitchButtonText>
        <SwitchButtonInput
          type={"checkbox"}
          id={"switch"}
          checked={inputChecked}
          onChange={checkHandler}
        />
        <SwitchButton htmlFor={"switch"} $checked={inputChecked}></SwitchButton>
        <SwitchButtonText>북마크한 단어장 </SwitchButtonText>
      </SwitchWrapper>
      <HeadWrapper>
        <HeadUserWrapper>
          <Avatar>
            <AvatarImage src="/logo.png" alt="Avatar" />
          </Avatar>
          <UserName>{userName}님</UserName>
        </HeadUserWrapper>
        <MainText>{mainText}</MainText>
      </HeadWrapper>
    </>
  );
}

export default VocabularyMarkHeader;
