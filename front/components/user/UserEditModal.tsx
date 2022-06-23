import React, { FC, useState } from "react";
import {
  AvatarEditWrapper,
  EditModalWrapper,
  CommentWrapper,
  Comment,
  EditModalTitle,
} from "./UserEditModal.style";
import { UserProperties } from "../../zustand/store";
import { Avatar, AvatarImage } from "../../pages/myPage/MyPage.style";
import { useDropzone } from "react-dropzone";
import { ConfirmButton } from "../intro/LoginRequiredModal.style";
import { AiOutlinePlus } from "react-icons/ai";
import { DropContainer } from "../word/upload/Dropzone.style";
import { Input, Label } from "../word/results/EditForm/EditForm.style";

interface UserEditModalProps {
  onClose: () => void;
  userInfo: UserProperties | null;
}
const UserEditModal = ({ onClose, userInfo }: UserEditModalProps) => {
  const [files, setFiles] = useState<File[]>([]);
  const [preview, setPreview] = useState("");
  const [comment, setComment] = useState("");

  const onDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    setPreview(URL.createObjectURL(acceptedFiles[0]));
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const thumbnail = files.map((file: File) => (
    <Avatar key={file.name}>
      <AvatarImage src={preview} alt={file.name} />
    </Avatar>
  ));
  return (
    <EditModalWrapper>
      <EditModalTitle>회원정보 수정하기</EditModalTitle>
      <AvatarEditWrapper>
        {preview ? (
          thumbnail
        ) : (
          <Avatar $modal>
            <AvatarImage src="/vercel.svg" alt="avatar" />
          </Avatar>
        )}

        <DropContainer {...getRootProps()}>
          <input {...getInputProps()} />
          <AiOutlinePlus />
        </DropContainer>
      </AvatarEditWrapper>
      <CommentWrapper>
        <label htmlFor="comment">코멘트 :</label>
        <Comment id="comment" type="text" value={userInfo?.comment} />
      </CommentWrapper>
      <ConfirmButton>수정하기</ConfirmButton>
    </EditModalWrapper>
  );
};

export default UserEditModal;
