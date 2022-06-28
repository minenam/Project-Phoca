import { Dispatch, SetStateAction } from "react";

export interface ModalProps {
  onClose: () => void;
}

export interface GuideMenuButtonProps {
  selected: string;
  setSelected: Dispatch<SetStateAction<string>>;
}

export interface CardProps {
  value: string;
}
