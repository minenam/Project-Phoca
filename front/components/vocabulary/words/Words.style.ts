import { styled } from "styletron-react";

export const Container = styled(
  "div",
  (props: { $headerHeight: string; $sidebarWidth: string }) => ({
    width: `calc(100vw - ${props.$sidebarWidth}-100px)`,
    height: `calc(100vh - ${props.$headerHeight})`,
    marginLeft: props.$sidebarWidth,
    boxSizing: "border-box",
  }),
);

export const Header = styled("div", {
  width: "55%",
  height: "10%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  textAlign: "center",
  fontSize: "2rem",
});

export const IconBtn = styled("button", {
  backgroundColor: "transparent",
  fontSize: "2rem",
  border: 0,
  cursor: "pointer",
  padding: "0 1rem",
});

export const CardContainer = styled("div", {
  height: "90%",
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  placeItems: "center",
  overflowY: "auto",
  "::-webkit-scrollbar": {
    backgroundColor: "#FFECD0",
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: "#FFAA2A",
    borderRadius: "20px",
  },
});

export const Card = styled("div", {
  width: "85%",
  height: "600px",
  margin: "3rem 0",
  borderRadius: "20px",
  backgroundImage: "url('/images/wordcard.png')",
  backgroundRepeat: "no-repeat",
  backgroundSize: "cover",
  backgroundPosition: "center",
});

export const CardHeader = styled("div", (props: { $isMine: boolean }) => ({
  height: "15%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  visibility: props.$isMine ? "visible" : "hidden",
}));

export const CardBody = styled("div", {
  height: "70%",
});

export const ImageContainer = styled("div", {
  height: "70%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const CardImage = styled("img", {
  maxWidth: "80%",
  maxHeight: "100%",
  overFit: "contain",
  borderRadius: "20px",
  border: "10px solid #feb2a5",
  backgroundColor: "#fff",
});

export const WordContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  marginTop: "1rem",
});

export const EngWord = styled("p", (props) => ({
  width: "100%",
  fontSize: "2.5rem",
  textAlign: "center",
  marginLeft: "2rem",
}));

export const KorWord = styled("p", (props) => ({
  fontSize: "1.5rem",
  textAlign: "center",
  marginTop: "1rem",
}));

export const InputContainer = styled("div", {
  backgroundColor: "#FFECD0",
  width: "90%",
  margin: "1rem auto",
  display: "flex",
});

export const BtnContainer = styled("div", {
  width: "100%",
  display: "flex",
  justifyContent: "center",
});

export const Button = styled("button", {
  backgroundColor: "#FFAA2A",
  border: 0,
  borderRadius: "20px",
  fontSize: "1.2rem",
  color: "#fff",
  padding: "0.5rem 3rem",
  margin: "1rem",
  cursor: "pointer",
});

export const ConfirmContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  textAlign: "center",
  fontSize: "2rem",
});

export const DelFormBtn = styled(
  "button",
  (props: { $isDelBtn?: boolean }) => ({
    backgroundColor: "transparent",
    color: props.$isDelBtn ? "#48cfc8" : "#FE7394",
    border: props.$isDelBtn ? "4px solid #48cfc8" : "4px solid #FE7394",
    borderRadius: "20px",
    padding: "0.5rem 1.5rem",
    margin: "1rem",
    fontSize: "1.2rem",
    cursor: "pointer",
  }),
);
