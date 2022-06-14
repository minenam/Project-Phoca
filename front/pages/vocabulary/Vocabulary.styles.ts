import { styled } from "styletron-react";

export const VocabularyWrapper = styled(
  "div",
  (props: { $sideBarWidth: string; $headerHeight?: string }) => ({
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: `calc(100vh - ${props.$headerHeight})`,
    marginLeft: props.$sideBarWidth,
    width: `calc(100vw - ${props.$sideBarWidth}px`,
    flexDirection: "column",
  }),
);

export const HeadWrapper = styled("div", {
  display: "flex",
  flexDirection: "row",
});

export const Avatar = styled("div", {
  borderRadius: "50%",
  width: "100px",
  height: "100px",
  marginTop: "1.5rem",
  border: "5px solid orange",
});

export const AvatarImage = styled("img", {
  width: "95%",
  height: "95%",
  display: "block",
  margin: "0 auto",
  objectFit: "contain",
});

export const MainText = styled("p", {
  fontSize: "2rem",
});
