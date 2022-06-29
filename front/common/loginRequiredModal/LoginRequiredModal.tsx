import {
  ModalWrapper,
  ConfirmButton,
  ModalContent,
} from "./LoginRequiredModal.style";
import { useRouter } from "next/router";
import { ModalProps } from "../types/propsType";

function LoginRequiredModal({ onClose }: ModalProps) {
  const router = useRouter();
  const conFirmHandler = () => {
    onClose();
    const currentUrl = router.asPath;
    router.push({
      pathname: "/login",
      query: { returnUrl: currentUrl },
    });
  };
  return (
    <ModalWrapper>
      <ModalContent>로그인이 필요한 서비스입니다.</ModalContent>

      <ConfirmButton onClick={conFirmHandler}>로그인하러 가기</ConfirmButton>
    </ModalWrapper>
  );
}

export default LoginRequiredModal;
