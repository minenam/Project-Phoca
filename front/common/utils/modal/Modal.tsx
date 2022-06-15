import { Container, ModalHeader, Line, CloseBtn } from "./Modal.style";

interface ModalProps {
  children: React.ReactNode;
  open: boolean;
  width: string;
  onClose: () => void;
}

function Modal({ children, open, width, onClose }: ModalProps) {
  if (!open) {
    return null;
  }
  return (
    <Container $isOpen={open} $width={width}>
      <ModalHeader>
        <Line />
        <CloseBtn onClick={onClose}>X</CloseBtn>
      </ModalHeader>
      {children}
    </Container>
  );
}

export default Modal;
