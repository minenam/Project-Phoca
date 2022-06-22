import { styled } from "styletron-react";

export const NoteContainer = styled(
  "div",
  (props: { $headerHeight: string; $sidebarWidth: string }) => ({
    width: `calc(100vw - ${props.$sidebarWidth}-100px)`,
    height: `calc(100vh - ${props.$headerHeight})`,
    marginLeft: props.$sidebarWidth,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxSizing: "border-box",
  }),
);

export const NoteBackground = styled(
  "div",
  (props: { $width: string; $height: string }) => ({
    width: props.$width,
    height: props.$height,
    backgroundColor: "#FEDDA6",
  }),
);

export const NoteHeader = styled("div", (props) => ({
  width: "100%",
  height: "10%",
  zIndex: 3,
  backgroundColor: "#FE8C55",
}));
