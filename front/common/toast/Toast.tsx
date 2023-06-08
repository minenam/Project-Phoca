import { useState, useEffect, Dispatch, SetStateAction } from "react";
import { isMiddle } from "@utils/useIsMiddle";
import { BiError, BiCheck } from "react-icons/bi";
import { ToastMsg } from "./Toast.style";

interface ToastProps {
  success: boolean;
  message: string;
  url: string;
  setMessage?: Dispatch<SetStateAction<string>>;
}

function Toast(props: ToastProps) {
  const { success, message, url, setMessage } = props;
  const [toastVisible, setToastVisible] = useState(true);
  const left = isMiddle(url);

  useEffect(() => {
    if (toastVisible) {
      const timerId = setTimeout(() => {
        setToastVisible(false);
        if (setMessage) {
          setMessage("");
        }
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
