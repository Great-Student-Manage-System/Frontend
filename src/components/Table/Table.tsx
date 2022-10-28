import React, { useState } from "react";
import { useRecoilValue } from "recoil";
import Student from "@components/Table/Student";
import { studentSelector, studentsTypes } from "@recoil/studentsRecoil";
import Exam from "@components/Table/Exam";
import { examSelector, examsTypes } from "@recoil/examsRecoil";
import styled from "styled-components";
import { useLocation } from "react-router-dom";

const StudentTable = styled.div`
  position: relative;
  top: 100px;
  margin-top: 20px;
  width: 1000px;
`;

const ExamTable = styled.div`
  position: relative;
  top: 100px;
  margin-top: 20px;
  width: 900px;
`;

const TR = styled.tr`
  height: 100%;
  padding: 3px;
  text-align: left;
  width: 1000px;
  height: 40px;
`;

const TH = styled.th`
  text-weight: bold;
  width: 100px;
  padding: 3px;
  width: 15em;
`;

export default function Table() {
  const { pathname } = useLocation();
  const students = useRecoilValue(studentSelector);
  const exams = useRecoilValue(examSelector);
  return (
    <>
      <StudentTable hidden={pathname === "/exams"}>
        <TR>
          <TH>이름</TH>
          <TH>학교</TH>
          <TH>학년</TH>
          <TH>선택과목</TH>
          <TH />
        </TR>
        {students
          ? students.data.map((student: studentsTypes) => {
              const { studentId, name, school, grade, subjects } = student;
              return (
                <Student
                  key={studentId}
                  studentId={studentId}
                  name={name}
                  school={school}
                  grade={grade}
                  subjects={subjects}
                />
              );
            })
          : null}
      </StudentTable>
      <ExamTable hidden={pathname === "/students"}>
        <TR>
          <TH>시험</TH>
          <TH>학년</TH>
          <TH>선택과목</TH>
        </TR>
        {exams
          ? exams.data.map((exam: examsTypes) => {
              const { examId, examName, schoolYear, subject } = exam;
              return (
                <Exam
                  key={examId}
                  examId={examId}
                  examName={examName}
                  schoolYear={schoolYear}
                  subject={subject}
                />
              );
            })
          : null}
      </ExamTable>
    </>
  );
}
