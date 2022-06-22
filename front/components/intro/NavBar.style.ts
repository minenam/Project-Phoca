import { styled } from "styletron-react";

export const Logo = styled("img", {
  width: "75px",
  display: "inline-block",
  marginRight: "30px",
  cursor: "pointer",
});

export const LogoText = styled("p", {
  cursor: "pointer",
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
  height: "130px",
});

export const Anchor = styled("a", {
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  fontWeight: "bold",
  width: "53%",
  fontSize: "2em",
});

export const Login = styled("a", {
  cursor: "pointer",
  fontSize: "1.5em",
  marginTop: "5px",
  marginRight: "20px",
  display: "flex",
  fontFamily: "Quicksand, sans-serif",
  alignSelf: "flex-end",
  fontWeight: "bold",
});

export const Welcome = styled("p", {
  display: "flex",
  alignSelf: "flex-end",
  fontWeight: 800,
  fontFamily: "Quicksand, sans-serif",
  borderBottom: "2.5px solid white",
  paddingBottom: "2px",
  marginBottom: "15px",
});
