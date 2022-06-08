import { FC } from "react";
import Link from "next/link";
import { styled } from "styletron-react";

const Logo = styled("img", {
  width: "75px",
  display: "inline-block",
  marginRight: "30px",
});
const Nav = styled("nav", {
  backgroundColor: "#FFAA2A",
  display: "flex",
  justifyContent: "center",
  height: "200px",
});
const Anchor = styled("a", {
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  fontWeight: "bold",
  fontSize: "2em",
});
const NavBar: FC = () => {
  return (
    <Nav>
      <Link href={"/"}>
        <Anchor>
          <Logo src="/logo.png" alt="logo" />
          포카
        </Anchor>
      </Link>
      <Link href={"/login"}>
        <Anchor>Login</Anchor>
      </Link>
    </Nav>
  );
};

export default NavBar;
