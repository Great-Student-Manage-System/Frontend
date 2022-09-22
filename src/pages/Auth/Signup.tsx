import Layout from "@components/Auth/Layout";
import Header from "@components/Auth/Header";
import React, { useState } from "react";
import styled from "styled-components";
import InputBox from "@components/Auth/InputBox";

const SignUpForm = styled.form`
  display: grid;
  width: var(--auth-content-width);
  margin: 0 auto;
`;

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
  const [password, setPassword] = useState<string>("");
  const [rePassword, setRePassword] = useState<string>("");
  const [nickName, setNickName] = useState<string>("");

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
          fnc={setEmail}
          title="이메일"
          placeholder="이메일을 입력해주세요"
          buttonProperty={emailConfirmProperty}
        />
        <InputBox
          changeHandler={inputChangeHandler}
          value={password}
          fnc={setPassword}
          title="비밀번호"
          placeholder="비밀번호를 입력해주세요"
        />
        <InputBox
          changeHandler={inputChangeHandler}
          value={rePassword}
          fnc={setRePassword}
          title="비밀번호 확인"
          placeholder="비밀번호를 입력해주세요"
        />
        <InputBox
          changeHandler={inputChangeHandler}
          value={nickName}
          fnc={setNickName}
          title="닉네임"
          placeholder="닉네임을 입력해주세요"
          buttonProperty={nickNameConfirmProperty}
        />

        <label>담당 과목</label>
        <select>
          <option></option>
        </select>

        <button type="submit">동의하고 회원가입하기</button>
      </SignUpForm>
    </Layout>
  );
}
