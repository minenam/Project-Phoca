import React, { useState } from "react";
import {
  AvatarEditWrapper,
  EditModalWrapper,
  CommentWrapper,
  Comment,
  EditModalTitle,
  EditButton,
  EditButtonWrapper,
  InputWrapper,
} from "./UserEditModal.style";
import { UserProperties, userStore } from "../../zustand/userStore";
import { Avatar, AvatarImage } from "../../pages/myPage/MyPage.style";
import { useDropzone } from "react-dropzone";
import { ConfirmButton } from "../../common/loginRequiredModal/LoginRequiredModal.style";
import { AiOutlinePlus } from "react-icons/ai";
import { DropContainer } from "../word/upload/Dropzone.style";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import Modal from "../../common/modal/Modal";
import UserDelModal from "./UserDelModal";
import UserPasswordEditModal from "./UserPasswordEditModal";

export interface UserEditModalProps {
  onClose: () => void;
  userInfo: UserProperties | null;
}

const UserEditModal = ({ onClose, userInfo }: UserEditModalProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [userNameState, setUserNameState] = useState(userInfo?.userName);
  const [preview, setPreview] = useState("");
  const [comment, setComment] = useState(userInfo?.comment);
  const [isDelModalOpen, setIsDelModalOpen] = useState(false);
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const router = useRouter();
  const url = router.pathname;

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    setPreview(URL.createObjectURL(acceptedFiles[0]));
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.currentTarget.id === "userName"
      ? setUserNameState(e.currentTarget.value)
      : setComment(e.currentTarget.value);
  };

  const deleteUserHandler = () => {
    setIsDelModalOpen(true);
  };

  const deleteModalCloseHandler = () => {
    setIsDelModalOpen(false);
  };

  const passwordEdit = () => {
    setIsPasswordModalOpen(true);
  };

  const passwordModalCloseHandler = () => {
    setIsPasswordModalOpen(false);
  };

  const onSubmitHandler = async () => {
    const formData = new FormData();
    formData.append("file", files[0]);
    formData.append("userName", userNameState ? userNameState : "");
    formData.append("comment", comment ? comment : "");
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/${userInfo?.userId}`,
      {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
        body: formData,
      },
    );

    if (!res.ok) {
      throw new Error(res.statusText);
    }
    const result = await res.json();

    const userData = {
      userId: result.userId,
      userName: result.userName,
      userImage: result.userImage,
      comment: result.comment,
      email: result.email,
    };
    return userData;
  };

  const userEditMutation = useMutation(onSubmitHandler, {
    onSuccess: (data) => {
      console.log("유저정보 수정 성공", data);
      userStore.setState({ user: data });
      onClose();
      router.push("/myPage");
    },
    onError: (err) => {
      console.error("유저정보 수정 실패", err);
    },
  });

  const thumbnail = files.map((file: File) => (
    <Avatar key={file.name} $modal>
      <AvatarImage src={preview} alt={file.name} />
    </Avatar>
  ));

  const user = userStore((state) => state.user);
  return (
    <EditModalWrapper>
      <EditModalTitle>회원정보 수정하기</EditModalTitle>
      <AvatarEditWrapper>
        {preview ? (
          thumbnail
        ) : (
          <Avatar $modal>
            <AvatarImage
              src={
                user?.userImage.startsWith("http")
                  ? user?.userImage
                  : `${process.env.NEXT_PUBLIC_IMAGE_URL}${user?.userImage}`
              }
            />
          </Avatar>
        )}

        <DropContainer {...getRootProps()}>
          <input {...getInputProps()} />
          <AiOutlinePlus />
        </DropContainer>
      </AvatarEditWrapper>
      <CommentWrapper>
        <InputWrapper>
          <label htmlFor="userName">이름 :</label>
          <Comment
            id="userName"
            type="text"
            value={userNameState}
            onChange={onChangeHandler}
          />
        </InputWrapper>
        <InputWrapper>
          <label htmlFor="comment">코멘트 :</label>
          <Comment
            id="comment"
            type="text"
            value={comment}
            onChange={onChangeHandler}
          />
        </InputWrapper>
      </CommentWrapper>
      <EditButtonWrapper>
        <EditButton $borderColor="#48cfc8" onClick={passwordEdit}>
          비밀번호 변경
        </EditButton>
        <EditButton
          $borderColor="#FE7394"
          $withdrawal
          onClick={deleteUserHandler}>
          회원 탈퇴
        </EditButton>
      </EditButtonWrapper>
      <ConfirmButton onClick={() => userEditMutation.mutate()}>
        수정완료
      </ConfirmButton>

      {isDelModalOpen && (
        <Modal
          open={isDelModalOpen}
          width="600px"
          onClose={deleteModalCloseHandler}
          large={true}
          url={url}>
          <UserDelModal onClose={deleteModalCloseHandler} userInfo={userInfo} />
        </Modal>
      )}
      {isPasswordModalOpen && (
        <Modal
          open={isPasswordModalOpen}
          width="600px"
          onClose={passwordModalCloseHandler}
          large={true}
          url={url}>
          <UserPasswordEditModal
            onClose={passwordModalCloseHandler}
            userInfo={userInfo}
          />
        </Modal>
      )}
    </EditModalWrapper>
  );
};

export default UserEditModal;
