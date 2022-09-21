import Layout from "@components/Auth/Layout";
// import Header from "@components/Header";
import React from "react";
import styled from "styled-components";

const SignUpForm = styled.form`
  /* display: block; */
  display: grid;
`;

const Conatiner = styled.div`
  width: 100%;
`;

const Header = styled.div`
  font-weight: 700;
  font-size: 36px;
  line-height: 40px;
  margin: 160px auto 100px auto;
`;

export default function Signup() {
  return (
    <Layout>
      <SignUpForm>
        <Header>회원가입</Header>
        <label>이메일</label>
        <input type={"email"} placeholder="이메일을 입력해주세요" />
        <button>인증하기</button>
        <label>비밀번호</label>
        <input />
        <label>비밀번호 확인</label>
        <input />
        <label>닉네임</label>
        <input />
        <button>인증하기</button>
        <label>담당 과목</label>
        <select>
          <option></option>
        </select>
        <button>동의하고 회원가입하기</button>
      </SignUpForm>
    </Layout>
  );
}
