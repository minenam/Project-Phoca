import { Dispatch, SetStateAction } from "react";

export interface ModalProps {
  onClose: () => void;
}

export interface VocabularyModalProps extends ModalProps {
  wordbookInfo: string;
}

export interface GuideMenuButtonProps {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}

export interface CardProps {
  value: { data: string; matched: boolean };
  handleChoice: (e: string) => void;
  isTwoSelected: boolean;
  setIsTwoSelected: Dispatch<SetStateAction<boolean>>;
}

export interface BookMarkProps {
  wordbookId: string;
  userId?: string;
}
