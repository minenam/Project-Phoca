import { useState, useEffect } from "react";
import { TitleContainer, Title, Description } from "./AuthCard.style";
import {
  Field,
  Label,
  Input,
  ErrorMsg,
  BtnContainer,
  FindPwBtn,
} from "./AccountPage.style";

interface FindPwFormProps {
  onClose: () => void;
}

// 이메일 유효성 검사
const emailPattern = /^[A-Za-z0-9_\.\-]+@[A-Za-z0-9\-]+\.[A-Za-z0-9\-]+/;

function FindPasswordForm(props: FindPwFormProps) {
  const { onClose } = props;

  const [email, setEmail] = useState(""); // 이메일
  const [errorMsg, setErrorMsg] = useState(""); // 에러 메세지

  // 확인 버튼 클릭 핸들러
  const FindPwBtnClickHandler = () => {
    onClose();
  };

  // 입력마다 이메일 유효한 값인지 확인 후 에러 메세지 출력
  useEffect(() => {
    if (!emailPattern.test(email)) {
      setErrorMsg("올바른 이메일 주소를 입력해 주세요.");
    } else {
      setErrorMsg("");
    }
  }, [email]);

  return (
    <>
      <TitleContainer>
        <Title>임시 비밀번호 발급</Title>
        <Description>회원가입 시 입력했던 이메일을 적어주세요.</Description>
      </TitleContainer>

      <Field>
        <Label htmlFor="email">이메일</Label>
        <Input
          id="email"
          name="email"
          type="text"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setEmail(e.target.value)
          }
          value={email}
        />
        {!!email && !!errorMsg ? <ErrorMsg>{errorMsg}</ErrorMsg> : null}
      </Field>

      <BtnContainer>
        <FindPwBtn onClick={FindPwBtnClickHandler}>확인</FindPwBtn>
      </BtnContainer>
    </>
  );
}

export default FindPasswordForm;
