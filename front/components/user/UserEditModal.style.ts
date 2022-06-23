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
  justifyContent: "center",
  alignItems: "center",
  padding: "1.2rem",
});

export const Comment = styled("input", {
  padding: "5px",
  border: "0.1px solid black",
  borderRadius: "10px",
  fontSize: "1.2rem",
  width: "80%",
  marginLeft: "5px",
});

export const EditButton = styled(
  "button",
  (props: { $backgroundColor?: string }) => ({}),
);
