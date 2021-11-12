import React, { useRef } from "react";
import Form, { FormRefFunctions } from "./Form";

export interface LoginFormObject {
  email: string;
  password: string;
}

interface Props {
  onSubmit: (login: LoginFormObject) => void;
  loading: boolean;
}

const LoginForm: React.ForwardRefRenderFunction<FormRefFunctions, Props> = (
  { onSubmit, loading=false }: Props,
  forwardedRef
) => {
  const formRef = useRef<FormRefFunctions>(null);
  React.useImperativeHandle(forwardedRef, () => ({
    clearState() {
      formRef.current?.clearState();
    },
  }));
  return (
    <Form
      loading={loading}
      ref={formRef}
      formObjects={[
        { name: "email", placeholder: "Email" },
        { name: "password", placeholder: "Lozinka" },
      ]}
      onSubmit={onSubmit as any}
      submitButtonText="Sign in"
    />
  );
};

export default React.forwardRef(LoginForm);
