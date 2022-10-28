import React from "react";
import Header from "@components/Main/Header";
import styled from "styled-components";
import { ReactComponent as MainImg } from "@images/main.svg";
import { ReactComponent as MainText } from "@images/mainText.svg";

const Wrapper = styled.div`
  display: block;
  position: absolute;
  margin-top: 350px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;

  .text {
    width: 100%;
    position: relative;
    margin-top: -10px;
  }
`;
const Link = styled.a`
  text-decoration: none;
`;
const Button = styled.button`
  position: relative;
  border-radius: 30px;
  font-weight: 1000;
  box-sizing: border-box;
  width: 200px;
  height: 60px;
  background: #319cea;
  color: rgb(255, 255, 255);
  font-size: 22px;
  border: none;
  cursor: pointer;
  margin-top: 20px;
`;

export default function Home() {
  return (
    <div>
      <Header />
      <Wrapper>
        <MainImg />
        <MainText className="text" />
        {/* 로그인 됐을경우 버튼을 누르면 students페이지로 이동
        안됐을 경우 로그인 페이지로 이동 */}
        <Link href="/auth/login">
          <Button>지금 시작하기</Button>
        </Link>
      </Wrapper>
    </div>
  );
}
