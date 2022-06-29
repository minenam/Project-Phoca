import {
  Container,
  ModalHeader,
  Line,
  CloseBtn,
  Background,
} from "./Modal.style";
import { isMiddle } from "../utils/useIsMiddle";

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  width: string;
  large: boolean;
  url: string;
  onClose: () => void;
}

function Modal({ children, open, width, large, url, onClose }: ModalProps) {
  if (!open) {
    return null;
  }
  const left = isMiddle(url);
  return (
    <>
      <Background $isOpen={open} onClick={onClose} />
      <Container $isOpen={open} $width={width} $large={large} $left={left}>
        <ModalHeader>
          <Line />
          <CloseBtn onClick={onClose}>X</CloseBtn>
        </ModalHeader>
        {children}
      </Container>
    </>
  );
}

export default Modal;
