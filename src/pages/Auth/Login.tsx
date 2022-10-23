import { loginFetcher } from "@apis/api";
import GoogleLoginButton from "@components/Auth/GoogleLogin";
import Header from "@components/Auth/Header";
import KaKaoLogin, { LoginWayButton } from "@components/Auth/KaKaoLogin";
import { accessTokenAtom } from "@recoil/accessTokenAtom";
import { setLocalStorage } from "@utility/storage";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { AuthForm } from "./Signup";

interface formProps {
  [key: string]: string;
}

export default function Login() {
  const { register, handleSubmit } = useForm();
  const [isEmailLogin, setIsEmailLogin] = useState(false);
  const setAccessToken = useSetRecoilState(accessTokenAtom);
  const navigation = useNavigate();

  const loginSubmitHandler = (data: formProps) => {
    loginFetcher({ email: data["email"], password: data["password"] })
      .then((data) => {
        console.log(data);
        if (data.code === 200) {
          const { accessToken } = data.data;
          const token = accessToken.split(" ")[1];
          setLocalStorage("token", token);
          setAccessToken(token);
          navigation("/students");
        } else {
          alert(data.message);
        }
      })
      .catch((error) => console.log(error));
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
            required={true}
          />
          <EmailLoginInput
            type={"password"}
            {...register("password")}
            placeholder="비밀번호를 입력해주세요"
            required={true}
          />
          <LoginWayButton type="submit">로그인</LoginWayButton>
          <SignUpParagraph>
            비밀번호가 기억나지 않나요?
            <SignUpSpan>
              <Link to="/"> 비밀번호 찾기</Link>
            </SignUpSpan>
          </SignUpParagraph>
        </AuthForm>
      ) : (
        <>
          <EmailLoginButton onClick={() => setIsEmailLogin(true)}>
            이메일 로그인
          </EmailLoginButton>
          <SeperateLine />
          <KaKaoLogin />
          <GoogleLoginButton />
          <SignUpParagraph>
            그레잇이 처음이신가요?
            <SignUpSpan>
              <Link to="/auth/signup">회원가입</Link>
            </SignUpSpan>
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
  border: 1px solid var(--grey);
  outline: none;
  padding: 0 1.6rem;
`;

const SeperateLine = styled.hr`
  width: var(--auth-content-width);
  margin: 1.6rem auto;
`;

const SignUpParagraph = styled.p`
  margin: 0 auto;
  font-weight: 700;
  font-size: 14px;
  line-height: 24px;
  font-style: normal;

  span {
    color: var(--primary);
  }
`;

const EmailLoginButton = styled(LoginWayButton)`
  background-color: #fff;
  color: var(--primary);
  border: 1.5px solid var(--primary);
`;

const SignUpSpan = styled.span`
  &:hover {
    font-weight: 700;
    text-decoration: underline;
  }
`;
