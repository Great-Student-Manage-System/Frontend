import { loginFetcher } from "@apis/api";
import GoogleLoginButton from "@components/Auth/GoogleLogin";
import Header from "@components/Auth/Header";
import KaKaoLogin, { LoginWayButton } from "@components/Auth/KaKaoLogin";
import { loginStateAtom } from "@recoil/atom";
import { setLocalStorage } from "@utility/storage";
import { emailValidation, passwordValidation } from "@utility/validation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { AuthForm } from "./Signup";

interface formProps {
  [key: string]: string;
}

interface validationProps {
  e: any;
  validate: React.Dispatch<React.SetStateAction<boolean>>;
  validationFunc: (value: string) => boolean;
}

export default function Login() {
  const { register, handleSubmit } = useForm();
  const setLoginState = useSetRecoilState(loginStateAtom);

  const [isEmailLogin, setIsEmailLogin] = useState(false);
  const navigation = useNavigate();

  const [isEmailValidation, setIsEmailValidation] = useState(false);
  const [isPasswordValidation, setIsPasswordValidation] = useState(false);

  const inputChangeHandler = ({
    e,
    validate,
    validationFunc,
  }: validationProps) => {
    const { value } = e.target;
    validate(validationFunc(value));
  };

  const loginSubmitHandler = async (data: formProps) => {
    const loginInfo = await loginFetcher({
      email: data["email"],
      password: data["password"],
    });
    if (loginInfo.code === 200) {
      const { accessToken } = loginInfo.data;
      const token = accessToken.split(" ")[1];
      setLoginState(true);
      setLocalStorage("token", token);
      navigation("/students");
    } else {
      alert(loginInfo.message);
    }
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
            onChange={(e) =>
              inputChangeHandler({
                e,
                validate: setIsEmailValidation,
                validationFunc: emailValidation,
              })
            }
          />
          <EmailLoginInput
            type={"password"}
            {...register("password")}
            placeholder="비밀번호를 입력해주세요"
            required={true}
            onChange={(e) =>
              inputChangeHandler({
                e,
                validate: setIsPasswordValidation,
                validationFunc: passwordValidation,
              })
            }
          />
          <LoginWayButton
            type="submit"
            disabled={!isEmailValidation || !isPasswordValidation}
          >
            로그인
          </LoginWayButton>
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
