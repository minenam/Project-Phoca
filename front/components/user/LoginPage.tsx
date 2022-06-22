import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
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
} from "./AccountPage.style";
import { userStore } from "../../zustand/store";

interface LoginValues {
  email: string;
  password: string;
}

const initialValue: LoginValues = { email: "", password: "" };

const loginHandler = async (data: LoginValues) => {
  const res = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/user/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  const result = res.json();
  return result;
};

function LoginPage() {
  const router = useRouter();
  const loginMutation = useMutation(loginHandler, {
    onSuccess: (data, variables) => {
      console.log("Login 성공 ", data);
      sessionStorage.setItem("userToken", data.token);
      userStore.setState({ user: data });
      router.push("/");
    },
    onError: (err, variables) => {
      console.log("Login 실패 ", err);
    },
  });

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

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
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
        <SnsTitle>SNS 로그인</SnsTitle>
        <BtnContainer>
          <KakaoBtn>
            <Image
              src="/images/kakaoLogin.png"
              alt="kakao-login-btn"
              width="183"
              height="45"
            />
          </KakaoBtn>
        </BtnContainer>
      </Form>
    </>
  );
}

export default LoginPage;
