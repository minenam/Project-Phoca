import { styled } from "styletron-react";

export const AuthCardContainer = styled(
  "div",
  (props: { $login?: Boolean }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    background: props.$login
      ? "url('/images/loginBg.jpg')"
      : "url('/images/registerBg.jpg')",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundPosition: "center",
  }),
);

export const Card = styled("div", {
  backgroundColor: "rgba( 255, 255, 255, 0.5 )",
  boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
  backdropFilter: "blur( 4px )",
  width: "600px",
  height: "500px",
  borderRadius: "50px",
  border: "1px solid rgba( 255, 255, 255, 0.18 )",
});

export const TitleContainer = styled("div", {
  height: "20%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
});

export const Logo = styled("img", {
  height: "40%",
  objectFit: "contain",
  cursor: "pointer",
});

export const Title = styled("h1", {
  fontSize: "2rem",
  fontWeight: 900,
  textAlign: "center",
});
