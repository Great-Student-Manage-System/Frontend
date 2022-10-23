import Header from "@components/Main/Header";
import Graph from "@components/Students/graph";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Button } from "@images/Icon/left_side_icon.svg";
import Table, { ObjectType } from "@components/Students/Table";
import { useSetRecoilState } from "recoil";
import { currentStudentAtom } from "@recoil/currentStudentInfo";
import { studentsTypes } from "@recoil/studentsAtom";

interface StudentExamProps extends ObjectType {
  name: string;
  score: number;
  grade: number;
  date: string;
}

const TEST_INFO: studentsTypes = {
  studentId: "150364",
  name: "김민수",
  school: "지상고등학교",
  grade: 1,
  subject: "물리1, 화학1",
};

/**
 * 성적 조회가 되면
 * 성적 고유아이디
 * 시험 고유 아이디
 * 시험 점수 반환.
 *  */
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

const STUDENT_COLUMNS = [
  ["name", "시험"],
  ["date", "날짜"],
  ["score", "점수"],
];

export default function StudentDetail() {
  const subjects = TEST_INFO?.subject.split(",");
  // 학생 성적들이 배열로 추가되어 있어야 함.
  // const [subject, setSubject] = useState(subjects[0]);
  // console.log(subjects);
  const navigate = useNavigate();
  const setCurrentStudent = useSetRecoilState(currentStudentAtom);

  tempData = tempData.map((data) => ({
    ...data,
    date: data.date.split("-").slice(1).join("/"),
  }));

  const graph = useMemo(() => {
    return <Graph data={tempData} />;
  }, [tempData]);

  const table = useMemo(() => {
    return <Table columns={STUDENT_COLUMNS} data={tempData} />;
  }, [tempData]);

  const goBackHandler = () => {
    navigate("/students");
  };

  useEffect(() => {
    // console.log("222");
    // if (!studentInfo) navigate("/");
    setCurrentStudent(TEST_INFO);
  }, []);

  return (
    <>
      <Header />
      {TEST_INFO && (
        <Wrapper>
          <HeadWrapper>
            <Button
              onClick={goBackHandler}
              style={{ position: "absolute", left: "-25px", top: "5px" }}
            />
            <NameSpan>{TEST_INFO.name}</NameSpan>
          </HeadWrapper>
          <SchoolWrapper>
            <InfoBox>{TEST_INFO.school}</InfoBox>
            <InfoBox>
              {TEST_INFO.grade < 4 ? `${TEST_INFO.grade}학년` : "N수생"}
            </InfoBox>
            <InfoSelect style={{ width: "17.6rem" }}>
              {subjects?.map((subject) => (
                <option>{subject}</option>
              ))}
            </InfoSelect>
          </SchoolWrapper>
          <GraphWrapper>
            <InfoSelect style={{ width: "9.1rem" }}>
              <option>2022</option>
              <option>2021</option>
              <option>2020</option>
            </InfoSelect>
            {graph}
          </GraphWrapper>
          <TableWrapper>{table}</TableWrapper>
        </Wrapper>
      )}
    </>
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

const InfoSelect = styled.select`
  width: ${(props) => props.style?.width};
  height: 4.2rem;
  border: 1px solid #bdbdbd;
  border-radius: 8px;
  margin: 0 6px;
  padding: 0 12px;

  background: url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M6 9L12 15L18 9' stroke='%23212121' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'/%3E%3C/svg%3E%0A")
    no-repeat right 8px center;

  &:focus,
  &:-webkit-autofill {
    border-color: var(--proimary);
  }
`;

const GraphWrapper = styled.div`
  margin: 20px 0;
`;

const TableWrapper = styled.div`
  margin: 20px 0 40px 0;
`;
