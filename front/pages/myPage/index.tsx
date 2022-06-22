import { NextPage } from "next";
import { SIDEBAR_WIDTH } from "../../common/utils/constant";
import {
  Browser,
  MyPageWrapper,
  UserInfoEdit,
  Avatar,
  AvatarImage,
  Wrapper,
  Triangle,
  UserName,
  UserInfoDetail,
  UserInfoWrapper,
  UserDetailWrapper,
  UserWrapper,
  Branch,
  ImgWrapper,
  Seal,
  RoundedBox,
} from "./MyPage.style";
import Link from "next/link";
import { userStore } from "../../zustand/store";

const MyPage: NextPage = () => {
  const user = userStore((state) => state.user);

  const sideBarWidth = parseInt(SIDEBAR_WIDTH.substring(0, 3)) + 100;

  return (
    <MyPageWrapper $sideBarWidth={`${sideBarWidth}px`}>
      <Wrapper>
        <UserInfoEdit $sideBarWidth={`${sideBarWidth}px`}>
          회원 정보 수정하기
        </UserInfoEdit>
      </Wrapper>
      <UserWrapper>
        <UserInfoWrapper>
          <Avatar>
            <AvatarImage src="/vercel.svg" alt="avatar" />
          </Avatar>
          <UserName>{user?.userName}님</UserName>
        </UserInfoWrapper>
        <UserInfoWrapper>
          <UserDetailWrapper>
            <RoundedBox>이메일</RoundedBox>
            <UserInfoDetail>{user?.email}</UserInfoDetail>
          </UserDetailWrapper>
          <UserDetailWrapper>
            <RoundedBox>코멘트</RoundedBox>
            <UserInfoDetail>테스트 코멘트</UserInfoDetail>
          </UserDetailWrapper>
        </UserInfoWrapper>
        <UserInfoWrapper>
          <UserDetailWrapper>
            <RoundedBox>내 단어장</RoundedBox>
            <UserInfoDetail>4개</UserInfoDetail>
          </UserDetailWrapper>
          <UserDetailWrapper>
            <RoundedBox>북마크한 단어장</RoundedBox>
            <UserInfoDetail>10개</UserInfoDetail>
          </UserDetailWrapper>
        </UserInfoWrapper>
        <ImgWrapper>
          <Seal src="/logo.png" alt="seal" />
          <Branch src="/branch.png" alt="branch" />
        </ImgWrapper>
      </UserWrapper>
      <UserWrapper $box>
        <Link href={"/network"} passHref>
          <Browser>
            단어장 {"\n"}둘러보기
            <Triangle />
          </Browser>
        </Link>

        <Link href={"/vocabulary"} passHref>
          <Browser>
            내 단어장{"\n"}바로가기
            <Triangle />
          </Browser>
        </Link>
      </UserWrapper>
    </MyPageWrapper>
  );
};

export default MyPage;
