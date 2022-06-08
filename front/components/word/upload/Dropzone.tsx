import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useDropzone, DropzoneProps } from "react-dropzone";
import { AiOutlinePlus } from "react-icons/ai";
import { Title, DropContainer, SubmitBtn } from "./Dropzone.style";

interface dropzoneProps extends DropzoneProps {
  files?: File[];
  onDrop?: (acceptedFiles: File[]) => void;
}

const Upload = (props: dropzoneProps) => {
  const [files, setFiles] = useState<File[]>([]); // 업로드할 파일

  // drop handler
  const onDrop = useCallback((acceptedFiles: File[]) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        }),
      ),
    );
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  useEffect(() => {
    console.log(files);
  }, [files]);

  return (
    <>
      <Title>단어를 찾을 이미지를 아래에 넣어주세요.</Title>
      <DropContainer {...getRootProps()}>
        <input {...getInputProps()} />
        <AiOutlinePlus />
      </DropContainer>
      <SubmitBtn>사진 보내기</SubmitBtn>
    </>
  );
};

export default Upload;
