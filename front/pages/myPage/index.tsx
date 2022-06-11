import { NextPage } from "next";
import {
  Browser,
  MyPageWrapper,
  UserInfo,
  UserInfoEdit,
  Avatar,
  AvatarImage,
  Wrapper,
  Triangle,
} from "./MyPage.style";

const myPage: NextPage = () => {
  return (
    <MyPageWrapper>
      <Wrapper>
        <UserInfoEdit>회원 정보 수정하기</UserInfoEdit>
      </Wrapper>
      <UserInfo>
        <Avatar>
          <AvatarImage src="/vercel.svg" alt="avatar" />
        </Avatar>
      </UserInfo>
      <Wrapper>
        <Browser>
          단어장 {"\n"}둘러보기
          <Triangle />
        </Browser>

        <Browser $myWord>
          내 단어장{"\n"}바로가기
          <Triangle />
        </Browser>
      </Wrapper>
    </MyPageWrapper>
  );
};

export default myPage;
