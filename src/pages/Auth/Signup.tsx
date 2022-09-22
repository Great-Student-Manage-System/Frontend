import Layout from "@components/Auth/Layout";
import Header from "@components/Auth/Header";
import React from "react";
import styled from "styled-components";
import InputBox from "@components/Auth/InputBox";

const SignUpForm = styled.form`
  display: grid;
`;

export default function Signup() {
  return (
    <Layout>
      <SignUpForm>
        <Header title={"회원가입"} />
        <InputBox
          title="이메일"
          placeholder="이메일을 입력해주세요"
          isButton={true}
        />
        <InputBox
          title="비밀번호"
          placeholder="비밀번호를 입력해주세요"
          isButton={false}
        />
        <InputBox
          title="비밀번호 확인"
          placeholder="비밀번호를 입력해주세요"
          isButton={false}
        />
        <InputBox
          title="닉네임"
          placeholder="닉네임을 입력해주세요"
          isButton={true}
        />

        <label>담당 과목</label>
        <select>
          <option></option>
        </select>

        <button>동의하고 회원가입하기</button>
      </SignUpForm>
    </Layout>
  );
}
