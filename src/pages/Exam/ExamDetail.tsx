import AuthLayout from "@components/layouts/AuthLayout";
import Header from "@components/Main/Header";
import { ReactComponent as Button } from "@images/Icon/left_side_icon.svg";
import Graph from "@components/Exams/graph";
import Table from "@components/Students/Table";

import {
  NoDataDiv,
  SearchExamButton,
  SearchExamInput,
  SerachHeader,
} from "@pages/Student/StudentDetail";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useRecoilValue } from "recoil";
import { currentExamAtom } from "@recoil/currentExamInfo";
import useGetStudentExam from "@hooks/useGetStudentExam";
import useGetExamInfo from "@hooks/useGetExamInfo";

interface ExamInfoProps {
  examId: number;
  examName: string;
  schoolYear: number; // 학년
  subject: string;
}

const EXAM_COLUMNS = [
  ["name", "이름"],
  ["school", "학교"],
  ["schoolYear", "학년"],
  ["score", "원점수"],
  ["grade", "등급"],
  ["", ""],
];

export default function ExamDetail() {
  const [searchedStudent, setSearchedStudent] = useState("");
  const { examId, examName, schoolYear, subject } =
    useRecoilValue(currentExamAtom);

  const { result: studentRecord } = useGetStudentExam(examId);
  const { result: examInfo } = useGetExamInfo(examId);
  const navigate = useNavigate();

  const graph = useMemo(() => {
    if (studentRecord.length === 0)
      return <NoDataDiv>데이터가 없습니다.</NoDataDiv>;
    if (examInfo !== undefined) {
      const test = new Array(20).fill({}).map(function (cur, index) {
        return {
          score: (index + 1) * 5,
          students: [],
          length: 0,
        };
      });

      const addedSchoolYearRecord = studentRecord.map((data) => ({
        ...data,
        schoolYear: examInfo.schoolYear,
      }));
      const sortedData =
        searchedStudent === ""
          ? addedSchoolYearRecord
          : addedSchoolYearRecord.filter((data: any) =>
              data.name.includes(searchedStudent),
            );
      return <Graph data={test} />;
    }
  }, [examInfo, searchedStudent, studentRecord]);

  const table = useMemo(() => {
    if (studentRecord.length === 0)
      return <NoDataDiv>데이터가 없습니다.</NoDataDiv>;
    if (examInfo !== undefined) {
      const addedSchoolYearRecord = studentRecord.map((data) => ({
        ...data,
        schoolYear: examInfo.schoolYear,
      }));
      const sortedData =
        searchedStudent === ""
          ? addedSchoolYearRecord
          : addedSchoolYearRecord.filter((data: any) =>
              data.name.includes(searchedStudent),
            );

      return <Table columns={EXAM_COLUMNS} data={sortedData} />;
    }
  }, [examInfo, searchedStudent, studentRecord]);

  const goBackHandler = () => {
    navigate("/exams");
  };

  return (
    <AuthLayout>
      <Header />
      {examId && (
        <Wrapper>
          <HeadWrapper>
            <Button
              onClick={goBackHandler}
              style={{ position: "absolute", left: "-25px", top: "5px" }}
            />{" "}
            <NameSpan>{examName}</NameSpan>
          </HeadWrapper>
          <SchoolWrapper>
            <InfoBox>{schoolYear}학년</InfoBox>
            <InfoBox>{subject}</InfoBox>
          </SchoolWrapper>
          <GraphWrapper>{graph}</GraphWrapper>
          <TableWrapper>
            <SerachHeader>
              <div>
                <SearchExamInput
                  placeholder="학생 이름"
                  value={searchedStudent}
                  onChange={(e) => setSearchedStudent(e.target.value)}
                />
                <SearchExamButton>검색</SearchExamButton>
              </div>
            </SerachHeader>
            {table}
          </TableWrapper>
        </Wrapper>
      )}
    </AuthLayout>
  );
}

const Wrapper = styled.div`
  margin-top: 9.1rem;
`;

const HeadWrapper = styled.div`
  position: relative;
`;
const NameSpan = styled.span`
  font-style: normal;
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 3.2rem;

  letter-spacing: -0.25px;
`;

const SchoolWrapper = styled.div`
  display: flex;
  margin: 8px 0 20px 0;
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 24px;
`;

const InfoBox = styled.div`
  width: 17.6rem;
  height: 4.2rem;
  display: flex;
  align-items: center;
  border: 1px solid #bdbdbd;
  border-radius: 8px;
  margin: 0 6px;
  padding: 0 12px;
`;

const GraphWrapper = styled.div`
  margin: 20px 0;
`;

const TableWrapper = styled.div`
  margin: 20px 0 40px 0;
`;
