import Link from "next/link";
import { useFormik } from "formik";
import {
  Form,
  ContentContainer,
  Field,
  Label,
  Input,
  BtnContainer,
  Button,
} from "./LoginPage.style";

interface LoginValues {
  id: string;
  password: string;
}

function LoginPage() {
  const initialValue: LoginValues = { id: "", password: "" };
  const formik = useFormik({
    initialValues: initialValue,
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
              value={formik.values.id}
            />
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
