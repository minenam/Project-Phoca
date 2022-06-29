import { UserEditModalProps } from "./UserEditModal";
import { BtnWrapper, UserDelModalWrapper } from "./userDelModal.style";
import { EditButton, EditModalTitle } from "./UserEditModal.style";
import { useRouter } from "next/router";
import { userStore } from "../../zustand/userStore";

const UserDelModal = ({ onClose, userInfo }: UserEditModalProps) => {
  const router = useRouter();

  const confirmHandler = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/${userInfo?.userId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
      },
    );
    userStore.setState({ user: null });
    sessionStorage.removeItem("userToken");
    router.push("/");
  };
  return (
    <UserDelModalWrapper>
      <EditModalTitle>정말 탈퇴하시겠습니까?</EditModalTitle>
      <BtnWrapper>
        <EditButton $borderColor="#48cfc8" onClick={confirmHandler}>
          확인
        </EditButton>
        <EditButton $borderColor="#FE7394" onClick={onClose}>
          취소
        </EditButton>
      </BtnWrapper>
    </UserDelModalWrapper>
  );
};

export default UserDelModal;
