import { styled } from "styletron-react";

export const EditModalTitle = styled("p", {
  fontSize: "1.4rem",
  textAlign: "center",
  padding: "1.2rem",
});
export const EditModalWrapper = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
});

export const AvatarEditWrapper = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  alignItems: "center",
  padding: "1.2rem",
});

export const CommentWrapper = styled("div", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  padding: "1.2rem",
});

export const InputWrapper = styled("div", {
  display: "flex",
  flexDirection: "row",
  justifyContent: "center",
  width: "100%",
  alignItems: "center",
  padding: "1rem",
});
export const Comment = styled("input", {
  padding: "5px",
  border: "0.1px solid black",
  borderRadius: "10px",
  fontSize: "1.2rem",
  width: "80%",
  marginLeft: "5px",
});
export const EditButtonWrapper = styled("div", {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
});
export const EditButton = styled(
  "button",
  (props: { $backgroundColor?: string; $withdrawal?: boolean }) => ({
    border: 0,
    borderRadius: "20px",
    backgroundColor: props?.$backgroundColor,
    padding: "0.5rem 1.5rem",
    margin: "1rem 1rem 1.5rem",
    fontSize: "1.2rem",
    cursor: "pointer",
  }),
);
