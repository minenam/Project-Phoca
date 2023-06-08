import {
  HeadUserWrapper,
  HeadWrapper,
  MainText,
  SwitchWrapper,
  SwitchButton,
  SwitchButtonInput,
  SwitchButtonText,
} from "./Vocabulary.styles";
import { Avatar, AvatarImage, UserName } from "@myPageComp/MyPage.style";
import { UserProperties, userStore } from "@zustand/userStore";

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
  const user = userStore((state) => state.user);
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
              src={
                user?.userImage.startsWith("http")
                  ? user?.userImage
                  : `${process.env.NEXT_PUBLIC_IMAGE_URL}${user?.userImage}`
              }
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
