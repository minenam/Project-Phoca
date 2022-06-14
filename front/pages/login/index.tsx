import Link from "next/link";
import type { NextPage } from "next";
import {
  AuthCardContainer,
  Card,
  TitleContainer,
  Logo,
  Title,
} from "../../components/user/AuthCard.style";
import LoginPage from "../../components/user/login/LoginPage";

const Login: NextPage = () => {
  return (
    <AuthCardContainer $login>
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
  );
};

export default Login;
