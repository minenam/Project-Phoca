import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
  AuthCardContainer,
  Card,
  TitleContainer,
  Logo,
  Title,
} from "../../components/user/AuthCard.style";
import LoginPage from "../../components/user/LoginPage";
import Seo from "../../common/Seo";
import Toast from "../../common/toast/Toast";

const Login: NextPage = () => {
  const [errorMsg, setErrorMsg] = useState("");

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
          <LoginPage setErrorMsg={setErrorMsg} />
        </Card>
      </AuthCardContainer>
      {errorMsg.length > 1 && (
        <Toast success={false} message={errorMsg} setErrorMsg={setErrorMsg} />
      )}
    </>
  );
};

export default Login;
