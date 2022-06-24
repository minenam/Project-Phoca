import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  AuthCardContainer,
  Card,
  TitleContainer,
  Logo,
  Title,
} from "../../components/user/AuthCard.style";
import LoginPage from "../../components/user/LoginPage";
import Seo from "../../common/Seo";

const Login: NextPage = () => {
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
          <LoginPage />
        </Card>
      </AuthCardContainer>
    </>
  );
};

export default Login;
