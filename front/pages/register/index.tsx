import Link from "next/link";
import type { NextPage } from "next";
import {
  AuthCardContainer,
  Card,
  TitleContainer,
  Logo,
  Title,
} from "../../components/user/AuthCard.style";
import RegisterPage from "../../components/user/RegisterPage";

const Register: NextPage = () => {
  return (
    <AuthCardContainer>
      <Card>
        <TitleContainer>
          <Link href="/">
            <Logo src="/logo.png" alt="logo" />
          </Link>
          <Title>회원가입</Title>
        </TitleContainer>
        <RegisterPage />
      </Card>
    </AuthCardContainer>
  );
};

export default Register;
