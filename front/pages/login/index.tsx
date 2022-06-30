import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import {
  AuthCardContainer,
  Card,
  TitleContainer,
  Logo,
  Title,
} from "../../components/user/AuthCard.style";
import LoginPage from "../../components/user/LoginPage";
import FindPasswordForm from "../../components/user/FindPasswordForm";
import Seo from "../../common/Seo";
import Toast from "../../common/toast/Toast";
import Modal from "../../common/modal/Modal";

const Login: NextPage = () => {
  const router = useRouter();
  const url = router.asPath;

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
          setErrorMsg={setErrorMsg}
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
