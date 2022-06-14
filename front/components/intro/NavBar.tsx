import { FC } from "react";
import Link from "next/link";
import { styled } from "styletron-react";
import {
  Anchor,
  Login,
  Logo,
  LogoText,
  Nav,
  RightMenuWrapper,
  Welcome,
} from "./NavBar.style";

const NavBar: FC = () => {
  return (
    <Nav>
      <Link href={"/"} passHref>
        <Anchor>
          <Logo src="/logo.png" alt="logo" />
          <LogoText>포카</LogoText>
        </Anchor>
      </Link>
      <RightMenuWrapper>
        <Link href={"/login"} passHref>
          <Login>Login</Login>
        </Link>
        <Welcome>Hi! I&apos;m Your English Mate!&nbsp;&nbsp;&nbsp;</Welcome>
      </RightMenuWrapper>
    </Nav>
  );
};

export default NavBar;
