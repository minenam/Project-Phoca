import {
  ModalWrapper,
  ConfirmButton,
  ModalContent,
} from "./LoginRequiredModal.style";
import { useRouter } from "next/router";
interface LoginModalProps {
  onClose: () => void;
}
function LoginRequiredModal({ onClose }: LoginModalProps) {
  const router = useRouter();
  const conFirmHandler = () => {
    onClose();
    router.push("/login");
  };
  return (
    <ModalWrapper>
      <ModalContent>로그인이 필요한 서비스입니다.</ModalContent>

      <ConfirmButton onClick={conFirmHandler}>확인</ConfirmButton>
    </ModalWrapper>
  );
}

export default LoginRequiredModal;
