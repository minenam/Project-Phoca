import { Dispatch, SetStateAction } from "react";

export interface ModalProps {
  onClose: () => void;
}

export interface GuideMenuButtonProps {
  key: string;
  text: string;
  cancelClicked?: boolean;
  trigger: Dispatch<SetStateAction<boolean>>;
}
