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
      const timerId = setTimeout(() => {
        setToastVisible(false);
        setErrorMsg("");
      }, 3000);
      return () => {
        clearTimeout(timerId);
      };
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
