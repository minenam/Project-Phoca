import { FC } from "react";
import Link from "next/link";
import { styled } from "styletron-react";
import {
  Anchor,
  Login,
  Logo,
  Nav,
  RightMenuWrapper,
  Welcome,
} from "./NavBar.style";

const NavBar: FC = () => {
  return (
    <Nav>
      <Link href={"/"}>
        <Anchor>
          <Logo src="/logo.png" alt="logo" />
          포카
        </Anchor>
      </Link>
      <RightMenuWrapper>
        <Link href={"/login"}>
          <Login>Login</Login>
        </Link>
        <Welcome>Hi! I&apos;m Your English Mate!&nbsp;&nbsp;&nbsp;</Welcome>
      </RightMenuWrapper>
    </Nav>
  );
};

export default NavBar;
