import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Seo from "@common/Seo";
import Toast from "@toast/Toast";
import Modal from "@modal/Modal";
import LoginPage from "@userComp/LoginPage";
import FindPasswordForm from "@userComp/FindPasswordForm";
import {
  AuthCardContainer,
  Card,
  TitleContainer,
  Logo,
  Title,
} from "@userComp/AuthCard.style";

const Login: NextPage = () => {
  const router = useRouter();
  const url = router.pathname;

  const [errorMsg, setErrorMsg] = useState("");
  const [findPwModalOpen, setFindPwModalOpen] = useState(false);

  const modalCloseHandler = () => {
    setFindPwModalOpen(false);
  };

  return (
    <>
      <Seo title="로그인" />
      <AuthCardContainer>
        <Image
          alt="loginpage-background-image"
          src="/images/loginBg.jpg"
          layout="fill"
          objectFit="cover"
          priority={true}
        />
        <Card>
          <TitleContainer>
            <Link href="/">
              <Logo src="/logo.png" alt="logo" />
            </Link>
            <Title>로그인</Title>
          </TitleContainer>
          <LoginPage
            setErrorMsg={setErrorMsg}
            setFindPwModalOpen={setFindPwModalOpen}
          />
        </Card>
      </AuthCardContainer>

      {errorMsg.length > 1 && (
        <Toast
          success={false}
          message={errorMsg}
          url={url}
          setMessage={setErrorMsg}
        />
      )}

      {findPwModalOpen && (
        <Modal
          open={findPwModalOpen}
          width="600px"
          large={true}
          url={url}
          onClose={modalCloseHandler}>
          <FindPasswordForm onClose={modalCloseHandler} />
        </Modal>
      )}
    </>
  );
};

export default Login;
