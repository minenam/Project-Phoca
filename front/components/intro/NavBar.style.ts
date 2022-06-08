import { styled } from "styletron-react";

export const Logo = styled("img", {
  width: "75px",
  display: "inline-block",
  marginRight: "30px",
});

export const RightMenuWrapper = styled("div", {
  width: "50%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-between",
});

export const Nav = styled("nav", {
  backgroundColor: "#FFAA2A",
  display: "flex",
  flexDirection: "row",
  width: "100%",
  height: "100px",
});

export const Anchor = styled("a", {
  display: "flex",
  alignItems: "center",
  cursor: "pointer",
  justifyContent: "flex-end",
  fontWeight: "bold",
  width: "50%",
  fontSize: "2em",
});

export const Login = styled("a", {
  cursor: "pointer",
  fontSize: "1.5em",
  display: "flex",
  marginRight: "25px",
  alignSelf: "flex-end",
  fontWeight: "bold",
});

export const Welcome = styled("p", {
  display: "flex",
  alignSelf: "flex-end",
  marginRight: "25px",
  borderBottom: "1.5px solid white",
  paddingBottom: "2px",
});
