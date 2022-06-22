import { useState, useEffect } from "react";
import { useDropzone, DropzoneProps } from "react-dropzone";
import { AiOutlinePlus } from "react-icons/ai";
import {
  Title,
  DropContainer,
  SubmitBtn,
  ImageContainer,
  ThumbImage,
} from "./Dropzone.style";
import { useRouter } from "next/router";

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

  // 썸네일
  const thumbnail = files.map((file: File) => (
    <ImageContainer key={file.name}>
      <ThumbImage src={preview} alt={file.name} />
    </ImageContainer>
  ));

  // image submit handler
  const imageSubmitHandler = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    router.push(
      {
        pathname: "/word/results",
        query: { imageUrl: preview },
      },
      "/word/results",
    );
  };

  useEffect(() => {
    console.log(files);
  }, [files]);

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
