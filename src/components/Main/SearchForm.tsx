import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const FormWrapper = styled.div`
  width: 100%;
  top: 120px;
  position: relative;
  left: 0;
`;

const TextWrapper = styled.div`
  width: 100%;
  position: relative;
  display: flex;
  vertical-align: bottom;
`;

const Text = styled.p`
  font-weight: bold;
  font-size: 18px;
`;

const TextS = styled.p`
  font-size: 12px;
  color: grey;
  padding: 15px 0 0 10px;
`;

const Form = styled.ul`
  height: 70px;
  padding: 0px;
  margin: 0px;
`;

const Select = styled.select`
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
const Input = styled.input`
  position: relative;
  height: 30px;
  width: 200px;
  border: 1px solid grey;
  border-radius: 5px;
  padding-left: 8px;
`;
const Search = styled.button`
  border-radius: 6px;
  font-weight: 1000;
  box-sizing: border-box;
  min-width: 60px;
  height: 30px;
  background: #319cea;
  color: rgb(255, 255, 255);
  font-size: 12px;
  border: none;
  cursor: pointer;
  margin: 10px 5px 10px 15px;
`;

export default function SearchForm() {
  const { pathname } = useLocation();

  return (
    <>
      <FormWrapper>
        <TextWrapper>
          <Text hidden={pathname === "/exams"}>학생</Text>
          <TextS hidden={pathname === "/exams"}>n명의 학생</TextS>
        </TextWrapper>
        <Text hidden={pathname === "/students"}>시험</Text>
        <Form>
          <Select>
            <option>학년</option>
            <option>1학년</option>
            <option>2학년</option>
            <option>3학년</option>
          </Select>
          <Select>
            <option>선택과목</option>
            <option>물리</option>
            <option>화학</option>
            <option>생명과학</option>
            <option>지구과학</option>
          </Select>
          <Input placeholder="학생이름"></Input>
          <Search>검색</Search>
        </Form>
      </FormWrapper>
    </>
  );
}
