import Header from "@components/Auth/Header";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

export default function Login() {
  return (
    <>
      <Header title="로그인" />
      <LoginWayButton>이메일 로그인</LoginWayButton>
      <hr />
      <LoginWayButton>Kakao로 로그인</LoginWayButton>
      <LoginWayButton>Google로 로그인</LoginWayButton>
      <p>
        그레잇이 처음이신가요?{" "}
        <span>
          <Link to="/auth/signup">회원가입</Link>
        </span>
      </p>
    </>
  );
}

const LoginWayButton = styled.button`
  width: 37.6rem;
  height: 5.6rem;
`;
