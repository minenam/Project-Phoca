import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "react-query";
import { wordStore } from "../../../zustand/wordStore";
import { AiOutlinePlus } from "react-icons/ai";
import {
  Title,
  DropContainer,
  SubmitBtn,
  ImageContainer,
  ThumbImage,
} from "./Dropzone.style";

const uploadImage = async (formData: FormData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/word/upload`, {
    method: "POST",
    body: formData,
  });
  const result = res.json();
  return result;
};

const Upload = () => {
  const router = useRouter();
  const [files, setFiles] = useState<File[]>([]); // 업로드할 파일
  const [preview, setPreview] = useState(""); // 업로드한 파일의 프리뷰

  // drop handler
  const onDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    setPreview(URL.createObjectURL(acceptedFiles[0]));
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  const uploadImageMutation = useMutation(uploadImage, {
    onSuccess: (data, variables) => {
      wordStore.setState({ word: data });
      router.push(`/word/results/${data.wordId}`);
    },
  });

  // image submit handler
  const imageSubmitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const formData: FormData = new FormData();
    formData.append("file", files[0]);

    uploadImageMutation.mutate(formData);
  };

  // 썸네일
  const thumbnail = files.map((file: File) => (
    <ImageContainer key={file.name}>
      <ThumbImage src={preview} alt={file.name} />
    </ImageContainer>
  ));

  return (
    <>
      <Title>단어를 찾을 이미지를 아래에 넣어주세요.</Title>
      {files.length === 0 ? (
        <DropContainer {...getRootProps()}>
          <input {...getInputProps()} />
          <AiOutlinePlus />
        </DropContainer>
      ) : (
        thumbnail
      )}

      {files.length !== 0 && (
        <SubmitBtn onClick={imageSubmitHandler}>사진 보내기</SubmitBtn>
      )}
    </>
  );
};

export default Upload;
