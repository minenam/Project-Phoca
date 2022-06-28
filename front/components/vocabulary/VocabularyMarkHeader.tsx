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
import { UserProperties } from "../../zustand/userStore";

interface Iprops {
  checkHandler: () => void;
  mainText: string;
  inputChecked: boolean;
  userInfo: UserProperties | null;
}

function VocabularyMarkHeader({
  checkHandler,
  mainText,
  inputChecked,
  userInfo,
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
            <AvatarImage
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${userInfo?.userImage}`}
              alt="Avatar"
            />
          </Avatar>
          <UserName>{userInfo?.userName}님</UserName>
        </HeadUserWrapper>
        <MainText>{mainText}</MainText>
      </HeadWrapper>
    </>
  );
}

export default VocabularyMarkHeader;
