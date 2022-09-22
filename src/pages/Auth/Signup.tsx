import Layout from "@components/Auth/Layout";
import Header from "@components/Auth/Header";
import React, { useState } from "react";
import styled from "styled-components";
import InputBox from "@components/Auth/InputBox";
import { useRecoilValue } from "recoil";
import { signUpConditionAtom, signUpConditionProps } from "@recoil/atom";

export interface ButtonProperty {
  buttonTitle: string;
  buttonHandler: (e: React.MouseEvent) => void;
  isValidation?: boolean;
}

export interface ChangeValue {
  e: React.ChangeEvent<HTMLInputElement>;
  fnc: React.Dispatch<React.SetStateAction<string>>;
}

export const inputChangeHandler = ({ e, fnc }: ChangeValue): void => {
  const { value } = e.currentTarget;
  fnc(value);
};

export default function Signup() {
  const [email, setEmail] = useState<string>("");
  const [emailConfirm, setEmailConfirm] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");

  const [isEmailConfirm, setIsEmailConfirm] = useState<boolean>(false);

  const signUpCondition =
    useRecoilValue<signUpConditionProps>(signUpConditionAtom);

  const emailConfirmProperty = {
    buttonTitle: "인증하기",
    buttonHandler: (e: React.MouseEvent) => {
      e.preventDefault();
      console.log(email);
    },
  };
  const nickNameConfirmProperty = {
    buttonTitle: "중복확인",
    buttonHandler: (e: React.MouseEvent) => {
      e.preventDefault();
      console.log(nickName);
    },
  };

  const signUpSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    // 여기서 submit 처리
  };

  return (
    <Layout>
      <SignUpForm onSubmit={signUpSubmitHandler}>
        <Header title={"회원가입"} />
        <InputBox
          changeHandler={inputChangeHandler}
          value={email}
          changeFunction={setEmail}
          title="이메일"
          placeholder="이메일을 입력해주세요"
          buttonProperty={emailConfirmProperty}
        />
        {isEmailConfirm ? (
          <InputBox
            changeHandler={inputChangeHandler}
            value={emailConfirm}
            changeFunction={setEmailConfirm}
            title="인증코드"
            placeholder="인증코드를 입력해주세요"
            buttonProperty={emailConfirmProperty}
          />
        ) : null}
        <InputBox
          changeHandler={inputChangeHandler}
          value={password}
          changeFunction={setPassword}
          title="비밀번호"
          placeholder="비밀번호를 입력해주세요"
        />
        <InputBox
          changeHandler={inputChangeHandler}
          value={rePassword}
          changeFunction={setRePassword}
          title="비밀번호 확인"
          placeholder="비밀번호를 입력해주세요"
        />
        <InputBox
          changeHandler={inputChangeHandler}
          value={nickName}
          changeFunction={setNickName}
          title="닉네임"
          placeholder="닉네임을 입력해주세요"
          buttonProperty={nickNameConfirmProperty}
        />

        <label>담당 과목</label>
        <select>
          <option></option>
        </select>

        <button
          type="submit"
          disabled={
            !signUpCondition.email ||
            !signUpCondition.nickName ||
            !signUpCondition.password ||
            !signUpCondition.subject
          }
        >
          동의하고 회원가입하기
        </button>
        <InfoSpan>
          <a>이용약관</a>과 <a>개인정보 수집이용</a>에 동의하며, 만 14세
          이상입니다.
        </InfoSpan>
      </SignUpForm>
    </Layout>
  );
}

const SignUpForm = styled.form`
  display: grid;
  width: var(--auth-content-width);
  margin: 0 auto;
`;

const InfoSpan = styled.span`
  font-size: 1.2rem;
  a {
    font-weight: bold;
    text-decoration: underline;
    &:hover {
      cursor: pointer;
    }
  }
`;
