import { styled } from "styletron-react";

export const AuthCardContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100vh",
});

export const Card = styled("div", {
  backgroundColor: "#FEB63D",
  boxShadow: "0 8px 32px 0 rgba( 31, 38, 135, 0.37 )",
  backdropFilter: "blur( 4px )",
  width: "700px",
  height: "500px",
  borderRadius: "50px",
});

export const TitleContainer = styled("div", {
  height: "20%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  marginBottom: "1rem",
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
