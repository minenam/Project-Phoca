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
  LinkBtn,
  SubmitButton,
  ErrorMsg,
} from "./AccountPage.style";

interface RegisterValues {
  id: string;
  name: string;
  password: string;
  confirmPassword: string;
}

function RegisterPage() {
  const initialValue: RegisterValues = {
    id: "",
    name: "",
    password: "",
    confirmPassword: "",
  };
  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: Yup.object({
      id: Yup.string()
        .email("아이디를 다시 확인해 주세요.")
        .required("아이디를 입력해 주세요."),
      name: Yup.string()
        .min(2, "이름은 2자 이상입니다.")
        .required("이름을 입력해 주세요."),
      password: Yup.string()
        .min(4, "비밀번호는 4자 이상입니다.")
        .required("비밀번호를 입력해 주세요."),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "비밀번호가 일치하지 않습니다.")
        .required("비밀번호를 한 번 더 입력해 주세요."),
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
            <Label htmlFor="name">이름</Label>
            <Input
              id="name"
              name="name"
              type="text"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
            {formik.touched.name && formik.errors.name ? (
              <ErrorMsg>{formik.errors.name}</ErrorMsg>
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
          <Field>
            <Label htmlFor="confirmPassword">비밀번호 확인</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              onChange={formik.handleChange}
              value={formik.values.confirmPassword}
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <ErrorMsg>{formik.errors.confirmPassword}</ErrorMsg>
            ) : null}
          </Field>
        </ContentContainer>
        <BtnContainer>
          <Link href="/login">
            <LinkBtn>로그인 하러 가기</LinkBtn>
          </Link>
          <SubmitButton type="submit">회원가입</SubmitButton>
        </BtnContainer>
      </Form>
    </>
  );
}

export default RegisterPage;
