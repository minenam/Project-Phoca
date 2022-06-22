import { FC, useEffect, useState } from "react";
import Link from "next/link";
import {
  Anchor,
  Login,
  Logo,
  Nav,
  RightMenuWrapper,
  Welcome,
} from "./NavBar.style";
import { userStore } from "../../zustand/store";

const NavBar: FC = () => {
  const user = userStore();
  const loginHandler = (e: React.MouseEvent<HTMLElement>) => {
    console.log(e.target);
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
        <Link href={"/login"} onClick={loginHandler} passHref>
          <Login>{user ? "Logout" : "Login"}</Login>
        </Link>
        <Welcome>Hi! I&apos;m Your English Mate!&nbsp;&nbsp;&nbsp;</Welcome>
      </RightMenuWrapper>
    </Nav>
  );
};

export default NavBar;
