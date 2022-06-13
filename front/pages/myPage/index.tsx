import { NextPage } from "next";
import {
  Browser,
  MyPageWrapper,
  UserInfoEdit,
  Avatar,
  AvatarImage,
  Wrapper,
  Triangle,
  UserName,
  EmailRoundedBox,
  UserInfoDetail,
  UserInfoWrapper,
  UserDetailWrapper,
  UserWrapper,
  Branch,
  ImgWrapper,
  Seal,
} from "./MyPage.style";

const myPage: NextPage = () => {
  return (
    <MyPageWrapper>
      <Wrapper>
        <UserInfoEdit>회원 정보 수정하기</UserInfoEdit>
      </Wrapper>
      <UserWrapper>
        <UserInfoWrapper>
          <Avatar>
            <AvatarImage src="/vercel.svg" alt="avatar" />
          </Avatar>
          <UserName>OOO님</UserName>
        </UserInfoWrapper>
        <UserInfoWrapper>
          <UserDetailWrapper>
            <EmailRoundedBox>이메일</EmailRoundedBox>
            <UserInfoDetail>test@test.com</UserInfoDetail>
          </UserDetailWrapper>
          <UserDetailWrapper>
            <EmailRoundedBox>코멘트</EmailRoundedBox>
            <UserInfoDetail>테스트 코멘트</UserInfoDetail>
          </UserDetailWrapper>
        </UserInfoWrapper>
        <ImgWrapper>
          <Seal src="/logo.png" alt="seal" />
          <Branch src="/branch.png" alt="branch" />
        </ImgWrapper>
      </UserWrapper>
      <UserWrapper $box>
        <Browser>
          단어장 {"\n"}둘러보기
          <Triangle />
        </Browser>

        <Browser $myWord>
          내 단어장{"\n"}바로가기
          <Triangle />
        </Browser>
      </UserWrapper>
    </MyPageWrapper>
  );
};

export default myPage;
