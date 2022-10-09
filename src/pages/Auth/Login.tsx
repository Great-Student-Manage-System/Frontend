import Header from "@components/Auth/Header";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { AuthForm } from "./Signup";
import KaKaoLoginImage from "@images/kakao_login_large_wide.png";

interface formProps {
  [key: string]: string;
}

export default function Login() {
  const { register, handleSubmit, formState } = useForm();

  const [isEmailLogin, setIsEmailLogin] = useState(false);

  const loginSubmitHandler = (data: formProps) => {
    console.log(data);
  };

  return (
    <>
      <Header title="로그인" />
      {isEmailLogin ? (
        <AuthForm onSubmit={handleSubmit(loginSubmitHandler)}>
          <EmailLoginInput
            type={"email"}
            {...register("email")}
            placeholder="이메일을 입력해주세요"
          />
          <EmailLoginInput
            type={"password"}
            {...register("password")}
            placeholder="비밀번호를 입력해주세요"
          />
          <LoginWayButton type="submit">로그인</LoginWayButton>
          <SignUpParagraph>
            비밀번호가 기억나지 않나요?
            <span>
              <Link to="/"> 비밀번호 찾기</Link>
            </span>
          </SignUpParagraph>
        </AuthForm>
      ) : (
        <>
          <LoginWayButton onClick={() => setIsEmailLogin(true)}>
            이메일 로그인
          </LoginWayButton>
          <SeperateLine />
          <KaKaoLoginButton />
          <LoginWayButton>Google로 로그인</LoginWayButton>
          <SignUpParagraph>
            그레잇이 처음이신가요?
            <span>
              <Link to="/auth/signup"> 회원가입</Link>
            </span>
          </SignUpParagraph>
        </>
      )}
    </>
  );
}

const LoginWrapper = styled.div`
  margin: 0 auto;
`;

const EmailLoginInput = styled.input`
  height: 5.6rem;
  margin: 0.8rem 0;
  border-radius: 0.8rem;
  border: 1px solid #bdbdbd;
`;

const LoginWayButton = styled.button`
  width: var(--auth-content-width);
  height: 5.6rem;
  margin: 1.6rem auto;
  border-radius: 0.6rem;
`;

const KaKaoLoginButton = styled(LoginWayButton)`
  border: none;
  background-image: url(${KaKaoLoginImage});
  background-size: var(--auth-content-width);
  background-repeat: no-repeat;
`;

const SeperateLine = styled.hr`
  width: var(--auth-content-width);
  margin: 1.6rem auto;
`;

const SignUpParagraph = styled.p`
  margin: 0 auto;
  span {
    color: var(--primary);
  }
`;
