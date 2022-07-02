import { styled } from "styletron-react";

export const SelectBookContainer = styled("div", {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
});

export const Title = styled("h1", {
  fontSize: "2rem",
  margin: "1rem",
  textAlign: "center",
});

export const Label = styled("label", {
  marginLeft: "1rem",
});

export const ListContainer = styled("div", (props: { $height: string }) => ({
  width: "90%",
  height: props.$height,
  backgroundColor: "#FFECD0",
  overflowY: "auto",
  "::-webkit-scrollbar": {
    backgroundColor: "#FFECD0",
  },
  "::-webkit-scrollbar-thumb": {
    backgroundColor: "#FFAA2A",
    borderRadius: "20px",
  },
  paddingTop: "1rem",
}));

export const ItemContainer = styled("div", {
  display: "flex",
  alignItems: "center",
  width: "80%",
  margin: "0.3rem auto 1rem",
  padding: "0.7rem 0.3rem",
  backgroundColor: "#fff",
  borderRadius: "10px",
});

export const TextContainer = styled("div", {
  height: "100%",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});

export const Text = styled("p", {
  fontSize: "1.5rem",
  textAlign: "center",
});
