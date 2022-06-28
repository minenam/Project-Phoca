import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQuery } from "react-query";
import { Dispatch, SetStateAction, useState } from "react";
import {
  Form,
  ContentContainer,
  Field,
  Label,
  Input,
  BtnContainer,
  SubmitButton,
  TextBtnContainer,
  TextButton,
  ErrorMsg,
  SnsTitle,
  KakaoBtn,
  SNSBtnContainer,
} from "./AccountPage.style";
import { userStore, UserProperties } from "../../zustand/userStore";

interface LoginPageProps {
  setErrorMsg: Dispatch<SetStateAction<string>>;
}

interface LoginValues {
  email: string;
  password: string;
}

interface ResponseType {
  statusCode: number;
  message: string;
  data: UserProperties;
  token: string;
}

const initialValue: LoginValues = { email: "", password: "" };

// 로그인 핸들러
const loginHandler = async (data: LoginValues) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result: ResponseType = await res.json();
  if (result.statusCode !== 201) {
    throw new Error(result.message);
  }
  return result;
};

// 카카오 로그인 핸들러
const kakaoLoginHandler = async () => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_SERVER_URL}/auth/kakao/login`,
  );
  if (!res.ok) {
    throw new Error("카카오 로그인 실패");
  }
  const result = await res.json();
  return result;
};

function LoginPage(props: LoginPageProps) {
  const router = useRouter();
  const { setErrorMsg } = props;

  const [isKakaoBtnClick, setIsKakaoBtnClick] = useState(false);

  // kakao login 요청
  useQuery(["kakao_login"], kakaoLoginHandler, {
    enabled: isKakaoBtnClick,
    retry: false,
    onSuccess: (data) => {
      console.log("kakao login success, data : ", data);
    },
    onError: (err) => {
      console.log("kakao login error : ", err);
      setIsKakaoBtnClick(false);
    },
  });

  // 로그인 요청
  const loginMutation = useMutation(loginHandler, {
    onSuccess: (result, variables) => {
      sessionStorage.setItem("userToken", result.token);
      userStore.setState({ user: result.data });

      if (router.query.returnUrl) {
        const returnUrl = router.query.returnUrl as string;
        router.push(returnUrl);
      } else {
        router.push("/");
      }
    },
    onError: ({ message }, variables) => {
      setErrorMsg(message);
    },
  });

  // 폼 유효성 검사, Submit Handler
  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: Yup.object({
      email: Yup.string()
        .email("이메일을 다시 확인해 주세요.")
        .required("이메일을 입력해 주세요."),
      password: Yup.string()
        .min(4, "비밀번호는 4자 이상입니다.")
        .required("비밀번호를 입력해 주세요."),
    }),
    onSubmit: async (values, actions) => {
      loginMutation.mutate(values);
    },
  });

  // 카카오 버튼 누름 상태 체크
  const kakaoBtnClickHandler = () => {
    setIsKakaoBtnClick(true);
  };

  return (
    <>
      <Form $isLogin onSubmit={formik.handleSubmit}>
        <ContentContainer>
          <Field>
            <Label htmlFor="email">이메일</Label>
            <Input
              id="email"
              name="email"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
            {formik.touched.email && formik.errors.email ? (
              <ErrorMsg>{formik.errors.email}</ErrorMsg>
            ) : null}
          </Field>
          <Field>
            <Label htmlFor="password">비밀번호</Label>
            <Input
              id="password"
              name="password"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
            {formik.touched.password && formik.errors.password ? (
              <ErrorMsg>{formik.errors.password}</ErrorMsg>
            ) : null}
          </Field>
        </ContentContainer>
        <BtnContainer>
          <SubmitButton type="submit">로그인</SubmitButton>
          <TextBtnContainer $loginPage>
            <Link href="/register">
              <TextButton>회원가입</TextButton>
            </Link>{" "}
            |<TextButton>비밀번호 찾기</TextButton>
          </TextBtnContainer>
        </BtnContainer>
      </Form>
      <SnsTitle>SNS 로그인</SnsTitle>
      <SNSBtnContainer>
        <KakaoBtn onClick={kakaoBtnClickHandler}>
          <Image
            src="/images/kakaoLogin.png"
            alt="kakao-login-btn"
            width="183"
            height="45"
          />
        </KakaoBtn>
      </SNSBtnContainer>
    </>
  );
}

export default LoginPage;
