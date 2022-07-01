import type { NextPage } from "next";
import Link from "next/link";
import Image from "next/image";
import Seo from "@common/Seo";
import RegisterPage from "@userComp/RegisterPage";
import {
  AuthCardContainer,
  Card,
  TitleContainer,
  Logo,
  Title,
} from "@userComp/AuthCard.style";

const Register: NextPage = () => {
  return (
    <>
      <Seo title="회원가입" />
      <AuthCardContainer>
        <Image
          alt="registerpage-background-image"
          src="/images/registerBg.jpg"
          layout="fill"
          objectFit="cover"
          priority={true}
        />
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
    </>
  );
};

export default Register;
