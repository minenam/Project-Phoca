import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { ToastMsg } from "./Toast.style";
import { BiError, BiCheck } from "react-icons/bi";

interface ToastProps {
  success: boolean;
  message: string;
  setErrorMsg: Dispatch<SetStateAction<string>>;
}

function Toast(props: ToastProps) {
  const { success, message, setErrorMsg } = props;
  const [toastVisible, setToastVisible] = useState(true);

  useEffect(() => {
    if (toastVisible) {
      setTimeout(() => {
        setToastVisible(false);
        setErrorMsg("");
      }, 2000);
    }
  }, []);

  return (
    <>
      {toastVisible && (
        <ToastMsg $success={success}>
          {success ? <BiCheck /> : <BiError />} {message}
        </ToastMsg>
      )}
    </>
  );
}

export default Toast;
