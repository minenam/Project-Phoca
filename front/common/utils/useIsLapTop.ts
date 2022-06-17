import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

export const useIsLapTop = () => {
  const [isNoteBook, setIsNoteBook] = useState(false);
  const notebook = useMediaQuery({ query: "maxWidth : 1728px" });

  useEffect(() => {
    setIsNoteBook(notebook);
  }, [isNoteBook]);

  return isNoteBook;
};
