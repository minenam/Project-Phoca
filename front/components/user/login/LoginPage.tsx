import Link from "next/link";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
  Form,
  ContentContainer,
  Field,
  Label,
  Input,
  BtnContainer,
  Button,
  ErrorMsg,
} from "./LoginPage.style";

interface LoginValues {
  id: string;
  password: string;
}

function LoginPage() {
  const initialValue: LoginValues = { id: "", password: "" };
  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: Yup.object({
      id: Yup.string()
        .email("아이디를 다시 확인해 주세요.")
        .required("아이디를 입력해 주세요."),
      password: Yup.string()
        .min(4, "비밀번호는 4자 이상입니다.")
        .required("비밀번호를 입력해 주세요."),
    }),
    onSubmit: (values, actions) => {
      console.log({ values, actions });
    },
  });

  return (
    <>
      <Form onSubmit={formik.handleSubmit}>
        <ContentContainer>
          <Field>
            <Label htmlFor="id">아이디</Label>
            <Input
              id="id"
              name="id"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.id}
            />
            {formik.touched.id && formik.errors.id ? (
              <ErrorMsg>{formik.errors.id}</ErrorMsg>
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
          <Button type="submit">로그인</Button>
          <Link href="/register">
            <Button>회원가입</Button>
          </Link>
        </BtnContainer>
      </Form>
    </>
  );
}

export default LoginPage;
