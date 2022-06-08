import Link from "next/link";
import { useState, useEffect, useCallback } from "react";
import { useDropzone, DropzoneProps } from "react-dropzone";

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
      <div {...getRootProps()} style={{ border: "1px solid black" }}>
        <input {...getInputProps()} />
        <p>Drag drop some files here, or click to select files</p>
      </div>
      <Link href="/word/results">
        <a>
          <button>결과 페이지 이동</button>
        </a>
      </Link>
    </>
  );
};

export default Upload;
