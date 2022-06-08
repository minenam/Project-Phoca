import { useState, useEffect, useCallback } from "react";
import { useDropzone, DropzoneProps } from "react-dropzone";
import { AiOutlinePlus } from "react-icons/ai";
import {
  Title,
  DropContainer,
  SubmitBtn,
  ImageContainer,
  ThumbImage,
} from "./Dropzone.style";

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

  const thumbnail = files.map((file: any) => (
    <ImageContainer key={file.name}>
      <ThumbImage src={file.preview} alt={file.name} />
    </ImageContainer>
  ));

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

      <SubmitBtn>사진 보내기</SubmitBtn>
    </>
  );
};

export default Upload;
