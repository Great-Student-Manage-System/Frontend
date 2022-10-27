import AuthLayout from "@components/layouts/AuthLayout";
import Header from "@components/Main/Header";
import Graph from "@components/Students/graph";
import Table from "@components/Students/Table";
import {
  SearchExamButton,
  SearchExamInput,
  SerachHeader,
  StudentExamProps,
} from "@pages/Student/StudentDetail";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface ExamInfoProps {
  examId: number;
  examName: string;
  schoolYear: number; // 학년
  subject: string;
}

const TEST_INFO: ExamInfoProps = {
  examId: 23141,
  examName: "6평",
  schoolYear: 1, // 학년
  subject: "사회",
};

let tempData: StudentExamProps[] = [
  {
    name: "6평",
    score: 88,
    grade: 3,
    date: "2022-06-18",
  },
  {
    name: "9평",
    score: 88,
    grade: 3,
    date: "2022-09-03",
  },
  {
    name: "10평",
    score: 88,
    grade: 3,
    date: "2022-10-5",
  },
];

const EXAM_COLUMNS = [
  ["name", "이름"],
  ["school", "학교"],
  ["schoolYear", "학년"],
  [],
  ["score", "점수"],
];
export default function ExamDetail() {
  const [typedStudent, setTypedStudent] = useState("");

  const navigate = useNavigate();

  const graph = useMemo(() => {
    return null;
    // return <Graph data={tempData} />;
  }, [tempData]);

  const table = useMemo(() => {
    return null;
    // <Table columns={EXAM_COLUMNS} data={recordData} />;
  }, []);

  const goBackHandler = () => {
    navigate("/exams");
  };

  const searchStudent = () => {
    console.log(typedStudent);
  };

  useEffect(() => {
    // console.log("222");
    // if (!studentInfo) navigate("/");
  }, []);

  return (
    <AuthLayout>
      <Header />
      {TEST_INFO && (
        <Wrapper>
          <HeadWrapper>
            <BackButton onClick={goBackHandler}>뒤로가기</BackButton>
            <NameSpan>{TEST_INFO.examName}</NameSpan>
          </HeadWrapper>
          <SchoolWrapper>
            <InfoBox>{TEST_INFO.schoolYear}</InfoBox>
            <InfoBox>{TEST_INFO.subject}</InfoBox>
          </SchoolWrapper>
          <GraphWrapper>{graph}</GraphWrapper>
          <TableWrapper>
            <SerachHeader>
              <div>
                <SearchExamInput placeholder="시험 이름" />
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

const BackButton = styled.button`
  position: absolute;
  left: -72px;
  top: 5px;
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
