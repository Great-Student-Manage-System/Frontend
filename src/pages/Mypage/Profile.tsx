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
const NameList = styled.div`
  top: 50px;
  position: relative;
  display: block;
`;
const Text = styled.p`
  position: absolute;
  width: 100px;
  font-size: 15px;
`;
const Name = styled.input`
  position: absolute;
  top: 45px;
  width: 200px;
  height: 30px;
  border-radius: 6px;
  border: solid 1px #bdbdbd;
  padding: 10px;
`;
const SubList = styled.div`
  top: 125px;
  position: relative;
  display: block;
`;
const Select = styled.select`
  position: absolute;
  top: 45px;
  height: 30px;
  text-align: center;
  margin-right: 10px;
  background-color: white;
  font-size: 14px;
  border: 1px solid grey;
  border-radius: 5px;
  padding: 0 8px;

  option {
    color: black;
    background: white;
    display: flex;
    padding: 5px;
  }
`;

const Save = styled.button`
  position: absolute;
  top: 220px;
  border-radius: 6px;
  box-sizing: border-box;
  width: 100px;
  height: 35px;
  font-weight: 600;
  background: #319cea;
  color: rgb(255, 255, 255);
  font-size: 12px;
  border: none;
  cursor: pointer;
`;

export default function Profile() {
  return (
    <div>
      <Header />
      <Navigation />
      <Wrapper>
        <Title>프로필 정보</Title>
        <NameList>
          <Text>닉네임</Text>
          <Name placeholder="봉천동불주먹" />
        </NameList>
        <SubList>
          <Text>담당과목</Text>
          <Select>
            <option>전체</option>
            <option>국어</option>
            <option>영어</option>
            <option>수학</option>
            <option>사회</option>
            <option>과학</option>
          </Select>
        </SubList>
        <Save>변경내용 저장</Save>
      </Wrapper>
    </div>
  );
}
