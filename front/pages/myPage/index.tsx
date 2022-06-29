import { NextPage } from "next";
import { HEADER_HEIGHT, SIDEBAR_WIDTH } from "../../common/utils/constant";
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
import { userStore } from "../../zustand/userStore";
import React, { useEffect, useState } from "react";
import Modal from "../../common/modal/Modal";
import UserEditModal from "../../components/user/UserEditModal";
import { useQuery } from "react-query";

const getCount = async (userId: string | undefined) => {
  try {
    const wordbookRes = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/wordbook/count/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      },
    );

    const bookmarkRes = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/bookmark/count/${userId}`,
      {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      },
    );

    const wordbookResult = await wordbookRes.json();
    const bookmarkResult = await bookmarkRes.json();

    return { wordbookResult, bookmarkResult };
  } catch (e) {
    console.error(e);
  }
};

const MyPage: NextPage = () => {
  const [userEditModalOpen, setUserEditModalOpen] = useState(false);
  const [wordbookCount, setWordbookCount] = useState();
  const [bookmarkCount, setbookmarkCount] = useState();

  const user = userStore((state) => state.user);

  const sideBarWidth = parseInt(SIDEBAR_WIDTH.substring(0, 3)) + 100;

  const { data } = useQuery(["getCount", user?.userId], () =>
    getCount(user?.userId),
  );

  const userEditModalCloseHandler = () => {
    setUserEditModalOpen(false);
  };

  const userEditModalOpenHandler = () => {
    setUserEditModalOpen(true);
  };

  useEffect(() => {
    setWordbookCount(data?.wordbookResult);
    setbookmarkCount(data?.bookmarkResult);
  }, [data]);

  return (
    <MyPageWrapper
      $sideBarWidth={`${sideBarWidth}px`}
      $headerHeight={HEADER_HEIGHT}>
      <Wrapper>
        <UserInfoEdit
          $sideBarWidth={`${sideBarWidth}px`}
          onClick={userEditModalOpenHandler}>
          회원 정보 수정하기
        </UserInfoEdit>
      </Wrapper>
      <UserWrapper>
        <UserInfoWrapper>
          <Avatar>
            <AvatarImage
              src={`${process.env.NEXT_PUBLIC_IMAGE_URL}${user?.userImage}`}
              alt="avatar"
            />
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
            <UserInfoDetail>{user?.comment}</UserInfoDetail>
          </UserDetailWrapper>
        </UserInfoWrapper>
        <UserInfoWrapper>
          <UserDetailWrapper>
            <RoundedBox>내 단어장</RoundedBox>
            <UserInfoDetail>{wordbookCount}개</UserInfoDetail>
          </UserDetailWrapper>
          <UserDetailWrapper>
            <RoundedBox>북마크한 단어장</RoundedBox>
            <UserInfoDetail>{bookmarkCount}개</UserInfoDetail>
          </UserDetailWrapper>
        </UserInfoWrapper>
        <ImgWrapper>
          <Seal src="/logo.png" alt="seal" />
          <Branch src="/images/branch.png" alt="branch" />
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
      {userEditModalOpen && (
        <Modal
          open={userEditModalOpen}
          width="500px"
          onClose={userEditModalCloseHandler}
          large={true}>
          <UserEditModal onClose={userEditModalCloseHandler} userInfo={user} />
        </Modal>
      )}
    </MyPageWrapper>
  );
};

export default MyPage;
