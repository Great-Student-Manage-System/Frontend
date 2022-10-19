import React from "react";
import Header from "@components/Main/Header";
import Navigation from "@components/Main/Navigation";
import styled from "styled-components";

const Wrapper = styled.div`
  position: relative;
  top: 140px;
  left: 80px;
  display: block;
`;
const Title = styled.div`
  position: absolute;
  font-size: 16px;
  font-weight: bold;
`;
const IdList = styled.div`
  position: relative;
  top: 50px;
  display: flex;
  height: 50px;
`;
const Email = styled.p`
  width: 200px;
`;
const PwdList = styled.div`
  position: relative;
  display: flex;
  top: 50px;

  height: 50px;
`;
const Pwd = styled.p`
  position: absolute;
  width: 200px;
`;
const Button = styled.button`
  position: absolute;
  width: 110px;
  border-radius: 6px;
  box-sizing: border-box;
  height: 30px;
  font-size: 12px;
  background-color: white;
  border: solid 1px #bdbdbd;
  cursor: pointer;
  left: 200px;
  top: 10px;
`;

export default function Account() {
  return (
    <div>
      <Header />
      <Navigation />
      <Wrapper>
        <Title>계정 정보</Title>
        <IdList>
          <Email>이메일</Email>
          <Email>dmstn@naver.com</Email>
        </IdList>
        <PwdList>
          <Pwd>비밀번호</Pwd>
          <Button>비밀번호 변경</Button>
        </PwdList>
      </Wrapper>
    </div>
  );
}
