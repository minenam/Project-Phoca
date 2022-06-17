import Link from "next/link";
import { useRouter } from "next/router";
import { useFormik } from "formik";
import * as Yup from "yup";
import * as Api from "../../common/utils/api";
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

interface LoginValues {
  email: string;
  password: string;
}

function LoginPage() {
  const router = useRouter();

  const initialValue: LoginValues = { email: "", password: "" };

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
      const { email, password } = values;
      const dataToSubmit: LoginValues = { email, password };

      try {
        const res = await Api.post("user/login", dataToSubmit);
        sessionStorage.setItem("userToken", res.data.accessToken);
      } catch (err) {
        console.log(err);
      }
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
            <img src="/images/kakaoLogin.png" alt="kakao-login-btn" />
          </KakaoBtn>
        </BtnContainer>
      </Form>
    </>
  );
}

export default LoginPage;
