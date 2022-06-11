import { useRouter } from "next/router";
import { AuthCardContainer, Card } from "./AuthCard.style";

function AuthCard() {
  const router = useRouter();
  return (
    <AuthCardContainer $login={router.pathname === "/login"}>
      <Card></Card>
    </AuthCardContainer>
  );
}

export default AuthCard;
