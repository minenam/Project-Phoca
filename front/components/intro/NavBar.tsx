import { FC } from "react";
import Link from "next/link";
import {
  Anchor,
  Login,
  Logo,
  Nav,
  RightMenuWrapper,
  Welcome,
} from "./NavBar.style";
import { userStore } from "../../zustand/userStore";

const NavBar: FC = () => {
  const user = userStore((state) => state.user);

  const loginHandler = (e: React.MouseEvent<HTMLElement>) => {
    if (user != null) {
      sessionStorage.removeItem("userToken");
      userStore.setState({ user: null });
    }
  };

  return (
    <Nav>
      <Link href={"/"} passHref>
        <Anchor>
          <Logo src="/logo.png" alt="logo" />
          포카
        </Anchor>
      </Link>
      <RightMenuWrapper>
        <Link href={"/login"} passHref>
          <Login onClick={loginHandler}>
            {user != null ? "Logout" : "Login"}
          </Login>
        </Link>
        <Welcome>Hi! I&apos;m Your English Mate!&nbsp;&nbsp;&nbsp;</Welcome>
      </RightMenuWrapper>
    </Nav>
  );
};

export default NavBar;
