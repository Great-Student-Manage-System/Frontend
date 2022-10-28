import React from "react";
import styled from "styled-components";
import { useLocation } from "react-router-dom";
import { GrAdd } from "react-icons/gr";
import { studentSelector } from "@recoil/studentsRecoil";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { modalState, openModalAtom } from "@recoil/atom";
import { currentModal } from "@data/currentModalState";

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
  width: 250px;
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
  margin: 10px 5px 10px 10px;
`;

const Add = styled.button`
  border-radius: 6px;
  font-size: 12px;
  border: solid #bdbdbd 1px;
  background: white;
  cursor: pointer;
  height: 30px;
  margin: 10px 5px 10px 10px;

  .add {
    margin: 0 5px 0 0;
  }
`;

export default function SearchForm() {
  const { pathname } = useLocation();
  const students = useRecoilValue(studentSelector);
  const setOpenState = useSetRecoilState(openModalAtom);
  const setModalState = useSetRecoilState(modalState);

  return (
    <>
      <FormWrapper>
        <TextWrapper>
          <Text hidden={pathname === "/exams"}>학생</Text>
          <TextS hidden={pathname === "/exams"}>
            {students.data.length}명의 학생
          </TextS>
        </TextWrapper>
        <Text hidden={pathname === "/students"}>시험</Text>
        <Form hidden={pathname === "/exams"}>
          <Select>
            <option>학년</option>
            <option value={1}>1학년</option>
            <option value={2}>2학년</option>
            <option value={3}>3학년</option>
          </Select>
          <Select>
            <option>선택과목</option>
            <option>물리</option>
            <option>화학</option>
            <option>생명과학</option>
            <option>지구과학</option>
          </Select>
          <Input placeholder="학생 이름"></Input>
          <Search>검색</Search>
          <Add
            onClick={() => {
              setOpenState(true);
              setModalState(currentModal.APPEND_STUDENT);
            }}
          >
            <GrAdd className="add" />
            학생추가하기
          </Add>
        </Form>
        <Form hidden={pathname === "/students"}>
          <Select>
            <option>년도</option>
            <option value={2022}>2022년</option>
          </Select>
          <Select>
            <option>학년</option>
            <option value={1}>1학년</option>
            <option value={2}>2학년</option>
            <option value={3}>3학년</option>
          </Select>
          <Select>
            <option>선택과목</option>
            <option>물리</option>
            <option>화학</option>
            <option>생명과학</option>
            <option>지구과학</option>
          </Select>
          <Input placeholder="시험 이름"></Input>
          <Search>검색</Search>
        </Form>
      </FormWrapper>
    </>
  );
}
