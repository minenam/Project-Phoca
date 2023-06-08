import { useRouter } from "next/router";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useMutation } from "react-query";
import Toast from "@toast/Toast";
import { AiOutlinePlus } from "react-icons/ai";
import {
  Title,
  DropContainer,
  SubmitBtn,
  ImageContainer,
  ThumbImage,
} from "./Dropzone.style";
import { WordInfo } from "@common/types/resultsType";

const uploadImage = async (formData: FormData) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/word/upload`, {
    method: "POST",
    body: formData,
  });

  if (!res.ok) {
    throw new Error("등록할 수 없는 이미지 입니다.");
  }

  const result: WordInfo = await res.json();
  return result;
};

const Upload = () => {
  const router = useRouter();
  const url = router.pathname;

  const [files, setFiles] = useState<File[]>([]); // 업로드할 파일
  const [preview, setPreview] = useState(""); // 업로드한 파일의 프리뷰
  const [errorMsg, setErrorMsg] = useState(""); // 에러 메세지

  // drop handler
  const onDrop = (acceptedFiles: File[]) => {
    setFiles(acceptedFiles);
    setPreview(URL.createObjectURL(acceptedFiles[0]));
  };

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/jpeg": [] },
  });

  const uploadImageMutation = useMutation(uploadImage, {
    onSuccess: (data) => {
      router.push(`/word/results/${data.wordId}`);
    },
    onError: ({ message }) => {
      setErrorMsg(message);
      setTimeout(() => {
        location.reload();
      }, 2000);
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

      {errorMsg.length > 1 && (
        <Toast
          success={false}
          message={errorMsg}
          url={url}
          setMessage={setErrorMsg}
        />
      )}

      {uploadImageMutation.isLoading && (
        <Toast
          success={true}
          message={"AI가 사진을 인식하고 있습니다."}
          url={url}
        />
      )}
    </>
  );
};

export default Upload;
