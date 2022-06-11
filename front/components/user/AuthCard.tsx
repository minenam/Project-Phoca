import Link from "next/link";
import { useRouter } from "next/router";
import {
  AuthCardContainer,
  Card,
  TitleContainer,
  Logo,
  Title,
} from "./AuthCard.style";
import LoginPage from "./login/LoginPage";

function AuthCard() {
  const router = useRouter();
  const isLoginPage: boolean = router.pathname === "/login";
  return (
    <AuthCardContainer $login={isLoginPage}>
      <Card>
        <TitleContainer>
          <Link href="/">
            <Logo src="/logo.png" alt="logo" />
          </Link>
          <Title>{isLoginPage ? "로그인" : "회원가입"}</Title>
        </TitleContainer>
        {isLoginPage && <LoginPage />}
      </Card>
    </AuthCardContainer>
  );
}

export default AuthCard;
