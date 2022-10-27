import React, { useCallback } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { studentsTypes } from "@recoil/studentsRecoil";
import styled from "styled-components";
import { CgMoreO } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { currentStudentAtom } from "@recoil/currentStudentInfo";

const TR = styled.tr`
  padding: 3px;
  width: 500px;
  height: 40px;
`;

const TD = styled.td`
  padding: 3px;
  height: 10px;

  .logo {
    text-align: center;
    cursor: pointer;
    vertical-align: middle;
  }
`;

const Student = (props: studentsTypes) => {
  const { studentId, name, school, grade, subjects } = props;
  const setCurrentStudent = useSetRecoilState(currentStudentAtom);
  // const deletStudent = useCallback(
  //   (studentId: string) => {
  //     setStudents(
  //       students.filter(
  //         (student: studentsTypes) => student.studentId !== studentId,
  //       ),
  //     );
  //   },
  //   [setStudents, students],
  // );
  const navigation = useNavigate();
  const goCurrentStudentDetail = useCallback(() => {
    setCurrentStudent(props);
    navigation(`/students/${studentId}`);
  }, [navigation, props, setCurrentStudent, studentId]);
  return (
    <>
      <TR onClick={goCurrentStudentDetail}>
        <TD>{name}</TD>
        <TD>{school}</TD>
        <TD>{grade}학년</TD>
        <TD>{subjects}</TD>
        <TD>
          <CgMoreO
            className="logo"
            size={22}
            color="#696969"
            onClick={() => null}
          />
        </TD>
      </TR>
    </>
  );
};

export default Student;
