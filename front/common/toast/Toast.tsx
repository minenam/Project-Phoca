import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { ToastMsg } from "./Toast.style";
import { BiError, BiCheck } from "react-icons/bi";
import { isMiddle } from "../utils/useIsMiddle";

interface ToastProps {
  success: boolean;
  message: string;
  url: string;
  setErrorMsg: Dispatch<SetStateAction<string>>;
}

function Toast(props: ToastProps) {
  const { success, message, url, setErrorMsg } = props;
  const [toastVisible, setToastVisible] = useState(true);
  const left = isMiddle(url);

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
        <ToastMsg $success={success} $left={left}>
          {success ? <BiCheck /> : <BiError />}{" "}
          {message.split("\n").map((text) => (
            <>
              {text}
              <br />
            </>
          ))}
        </ToastMsg>
      )}
    </>
  );
}

export default Toast;
