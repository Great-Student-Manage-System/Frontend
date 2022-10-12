import React, { useCallback } from "react";
import { useRecoilState } from "recoil";
import { studentsTypes, studentsAtom } from "@recoil/atom";
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

interface PropsTypes {
  studentId: string;
  name: string;
  school: string;
  grade: number;
  subject: string;
}

const Student = (props: PropsTypes) => {
  const { studentId, name, school, grade, subject } = props;
  const [students, setStudents] = useRecoilState<studentsTypes[]>(studentsAtom);

  const deletStudent = useCallback(
    (studentId: string) => {
      setStudents(
        students.filter(
          (student: studentsTypes) => student.studentId !== studentId,
        ),
      );
    },
    [setStudents, students],
  );

  return (
    <>
      <TR>
        <TD>{name}</TD>
        <TD>{school}</TD>
        <TD>{grade}학년</TD>
        <TD>{subject}</TD>
        <TD>
          <CgMoreO
            className="logo"
            size={22}
            color="#696969"
            onClick={() => deletStudent(studentId)}
          />
        </TD>
      </TR>
    </>
  );
};

export default Student;
