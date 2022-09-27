import Header from "@components/Auth/Header";
import Layout from "@components/Auth/Layout";
import React from "react";
import { Link } from "react-router-dom";

export default function Login() {
  return (
    <>
      <Header title="로그인" />
      <p>
        그레잇이 처음이신가요?{" "}
        <span>
          <Link to="/auth/signup">회원가입</Link>
        </span>
      </p>
    </>
  );
}
