import React from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import { studentsTypes } from "@recoil/studentsRecoil";
import styled from "styled-components";
import { CgMoreO } from "react-icons/cg";

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

  return (
    <>
      <TR>
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
