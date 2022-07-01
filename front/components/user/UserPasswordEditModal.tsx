import {
  PasswordForm,
  PasswordInput,
  PasswordWrapper,
  InputWrapper,
} from "./UserPasswordEditModal.style";
import { UserEditModalProps } from "./UserEditModal";
import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { userStore } from "../../zustand/userStore";
import { ErrorMsg } from "./AccountPage.style";
import { ConfirmButton } from "../../common/loginRequiredModal/LoginRequiredModal.style";
import { Title } from "../guide/Guide.style";

interface passwordChangeProps {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  userId: string | undefined;
}

const passwordChange = async (data: passwordChangeProps) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/user/${data.userId}/password`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${sessionStorage.getItem("userToken")}`,
        },
        body: JSON.stringify({
          currentPassword: data.currentPassword,
          newPassword: data.newPassword,
          newPasswordValid: data.confirmPassword,
        }),
      },
    );

    if (!res.ok) {
      throw new Error("비밀번호 수정 실패");
    }

    const result = res.json();

    return result;
  } catch (e) {
    console.error(e);
  }
};

const UserPasswordEditModal = ({ onClose, userInfo }: UserEditModalProps) => {
  const router = useRouter();

  const initialValue = {
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  };

  const passwordMutation = useMutation(passwordChange, {
    onSuccess: (data, variables) => {
      userStore.setState({ user: null });
      onClose();
      router.push("/login");
    },
    onError: (err, variables) => {
      console.log("Register 실패 ", err);
    },
  });

  const formik = useFormik({
    initialValues: initialValue,
    validationSchema: Yup.object({
      currentPassword: Yup.string()
        .min(4, "비밀번호는 4자 이상입니다.")
        .required("현재 비밀번호를 입력해 주세요."),
      newPassword: Yup.string()
        .min(4, "비밀번호는 4자 이상입니다.")
        .required("비밀번호를 입력해 주세요."),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "비밀번호가 일치하지 않습니다.")
        .required("비밀번호를 한 번 더 입력해 주세요."),
    }),
    onSubmit: async (values, actions) => {
      const data: passwordChangeProps = { ...values, userId: userInfo?.userId };
      passwordMutation.mutate(data);
    },
  });

  return (
    <>
      <Title>비밀번호 변경</Title>
      <PasswordForm onSubmit={formik.handleSubmit}>
        <PasswordWrapper>
          <InputWrapper>
            <label htmlFor="currentPassword">현재 비밀번호 :</label>
            <PasswordInput
              id="currentPassword"
              name="currentPassword"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.currentPassword}
            />
          </InputWrapper>
          {formik.touched.currentPassword && formik.errors.currentPassword ? (
            <ErrorMsg>{formik.errors.currentPassword}</ErrorMsg>
          ) : null}
        </PasswordWrapper>
        <PasswordWrapper>
          <InputWrapper>
            <label htmlFor="newPassword">새 비밀번호 :</label>
            <PasswordInput
              id="newPassword"
              name="newPassword"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.newPassword}
            />
          </InputWrapper>
          {formik.touched.newPassword && formik.errors.newPassword ? (
            <ErrorMsg>{formik.errors.newPassword}</ErrorMsg>
          ) : null}
        </PasswordWrapper>
        <PasswordWrapper>
          <InputWrapper>
            <label htmlFor="confirmPassword">새 비밀번호 확인 :</label>
            <PasswordInput
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.confirmPassword}
            />
          </InputWrapper>
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <ErrorMsg>{formik.errors.confirmPassword}</ErrorMsg>
          ) : null}
        </PasswordWrapper>
        <ConfirmButton type={"submit"}>변경 완료</ConfirmButton>
      </PasswordForm>
    </>
  );
};

export default UserPasswordEditModal;
