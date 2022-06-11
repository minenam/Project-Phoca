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
  width: "800px",
  height: "500px",
  borderRadius: "50px",
  border: "1px solid rgba( 255, 255, 255, 0.18 )",
});
