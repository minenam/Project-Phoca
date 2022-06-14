import { styled } from "styletron-react";

export const Form = styled("form", {
  display: "flex",
  flexDirection: "column",
  height: "80%",
});

export const ContentContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  marginBottom: 0,
});

export const Field = styled("div", {
  display: "grid",
  gridTemplateColumns: "0.7fr 2.3fr",
  margin: "1rem 3rem",
});

export const Label = styled("label", {
  fontSize: "1.5rem",
});

export const Input = styled("input", {
  border: "0",
  borderBottom: "2px solid black",
  backgroundColor: "transparent",
  height: "30px",
  fontSize: "1.5rem",
  ":focus": {
    borderBottom: "3px solid #FFAA2A",
    outline: "none",
  },
});

export const BtnContainer = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "100%",
});

export const LinkBtn = styled("button", {
  backgroundColor: "#fff",
  backgroundImage: "linear-gradient(45deg, #FFAA2A 50%, transparent 50%)",
  backgroundPosition: "100%",
  backgroundSize: "400%",
  transition: "background 0.5s ease-in-out",
  border: "3px solid #FFAA2A",
  borderRadius: "10px",
  width: "170px",
  height: "40px",
  fontSize: "1rem",
  fontWeight: "bold",
  color: "#FFAA2A",
  marginRight: "1rem",
  cursor: "pointer",
  ":hover": {
    backgroundPosition: 0,
    color: "#fff",
  },
});

export const SubmitButton = styled("button", {
  backgroundColor: "#FFAA2A",
  border: 0,
  borderRadius: "10px",
  width: "170px",
  height: "40px",
  fontSize: "1rem",
  fontWeight: "bold",
  color: "#fff",
  marginRight: "1rem",
  cursor: "pointer",
});

export const ErrorMsg = styled("div", {
  color: "red",
  gridColumnStart: 2,
  marginTop: "0.5rem",
});

export const SnsTitle = styled("div", {
  display: "flex",
  alignItems: "center",
  fontSize: "1rem",
  ":before": {
    content: "''",
    flexGrow: 1,
    backgroundColor: "#000",
    height: "1.5px",
    fontSize: "0px",
    lineHeight: "0px",
    marginRight: "0.5rem",
  },
  ":after": {
    content: "''",
    flexGrow: 1,
    backgroundColor: "#000",
    height: "1.5px",
    fontSize: "0px",
    lineHeight: "0px",
    marginLeft: "0.5rem",
  },
});

export const KakaoBtn = styled("button", {
  border: 0,
  backgroundColor: "transparent",
  cursor: "pointer",
});
