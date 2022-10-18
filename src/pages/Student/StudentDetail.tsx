import Header from "@components/Main/Header";
import Graph from "@components/Students/graph";
import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

interface STUDENT_INFO {
  studentId: string;
  name: string;
  school: string;
  grade: number;
  subjects: string;
}

interface StudentExamProps {
  name: string;
  score: number;
  grade: number;
  date: string;
}

interface StudentDetailProps {
  studentInfo?: STUDENT_INFO;
}

const TEST_INFO: STUDENT_INFO = {
  studentId: "150364",
  name: "김민수",
  school: "지상고등학교",
  grade: 1,
  subjects: "물리1, 화학1",
};

/**
 * 성적 조회가 되면
 * 성적 고유아이디
 * 시험 고유 아이디
 * 시험 점수 반환.
 *  */

export default function StudentDetail() {
  const subjects = TEST_INFO?.subjects.split(",");
  // 학생 성적들이 배열로 추가되어 있어야 함.
  // const [subject, setSubject] = useState(subjects[0]);
  // console.log(subjects);
  const navigate = useNavigate();
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
  const graph = useMemo(() => {
    return <Graph data={tempData} />;
  }, [tempData]);

  const goBackHandler = () => {
    navigate("/students");
  };

  useEffect(() => {
    // console.log("222");
    // if (!studentInfo) navigate("/");
  }, []);

  return (
    <>
      <Header />
      {TEST_INFO && (
        <Wrapper>
          <HeadWrapper>
            <BackButton onClick={goBackHandler}>뒤로가기</BackButton>
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
          <TableWrapper>테이블</TableWrapper>
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

const InfoSelect = styled.select`
  width: ${(props) => props.style?.width};
  height: 4.2rem;
  border: 1px solid #bdbdbd;
  border-radius: 8px;
  margin: 0 6px;
  padding: 0 12px;

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
