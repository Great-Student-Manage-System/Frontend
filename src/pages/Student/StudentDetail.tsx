import Header from "@components/Main/Header";
import Graph from "@components/Students/graph";
import React, { useEffect, useMemo, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { ReactComponent as Button } from "@images/Icon/left_side_icon.svg";
import Table, { ObjectType } from "@components/Students/Table";
import { useRecoilState, useSetRecoilState } from "recoil";
import {
  currentStudentAtom,
  currentStudentInfoAtom,
} from "@recoil/currentStudentInfo";
import { studentsTypes } from "@recoil/studentsAtom";
import AuthLayout from "@components/layouts/AuthLayout";
import { examProps } from "@hooks/useExamList";
import dayjs from "dayjs";
import { studentRecordProps } from "@hooks/useStudentRecord";
import { modalState, openModalAtom } from "@recoil/atom";
import { ReactComponent as AppendNormal } from "@images/Icon/append_normal_icon.svg";
import { currentModal } from "@data/currentModalState";
import { getLocalStorageValue } from "@utility/storage";
import { loadExamListFetcher, loadStudentDetailFetcher } from "@apis/api";

export interface StudentExamProps extends ObjectType {
  name: string;
  score: number;
  grade: number;
  date: string;
}

const TEST_INFO: studentsTypes = {
  studentId: "2",
  name: "김민수",
  school: "지상고등학교",
  grade: 3,
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
  ["examName", "시험"],
  ["date", "날짜"],
  ["score", "점수"],
];

/**
 *
 * 1. 상세보기 클릭했을 떄, 전역 상태로 CurrentStudent 값 추가
 * 2. 해당 값에 있는 data들을 바탕으로 값을 그림
 * 3. ({studentId} {subject} {year}) => {  "recordId": 1,"examId": 1,"score": 43} --> 학생 성적을 통해 과목에 대한 시험 그래프 조회
 * 4. 시험 목록역시 조회해야 함 -> 해당 학생에게 알맞는 시험정보가 따로있기 때문 (학생 성적 추가시에 필요)
 *  -> 3,4에서 얻은 examId와 시험 목록 관련 정보를 합해서 StudentExamProps을 만들어야 함
 * 5. 학생 성적추가 및 학생 연도/과목 변경시 그래프와 테이블에 변화가 있어야 함.
 *  -> 즉 그래프와 테이블은 같은 데이터를 공유
 *  ->
 */

export default function StudentDetail() {
  const accessToken = getLocalStorageValue("token") || "";
  const setModalOpen = useSetRecoilState(openModalAtom);
  const setModalState = useSetRecoilState(modalState);

  const [studentRecord, setStundentRecord] = useState<studentRecordProps[]>([]);
  const [examList, setExamList] = useState<examProps[]>([]);

  const [{ subject, year }, setCurrentSubjectInfo] = useRecoilState(
    currentStudentInfoAtom,
  );

  const [serachExamWord, setSearchExamWord] = useState("");
  const { studentId } = TEST_INFO;

  useEffect(() => {
    setCurrentSubjectInfo({
      subject: TEST_INFO?.subject.split(",")[0],
      year: dayjs().format("YYYY"),
    });
    getStudentRecord();
    getExamRecord();
  }, []);

  const getStudentRecord = useCallback(async () => {
    const obj = {
      studentId,
      subject: subject === "" ? TEST_INFO?.subject.split(",")[0] : subject,
      year,
      accessToken,
    };
    const data = await loadStudentDetailFetcher(obj);
    if (data && data.code === 200) {
      const { data: studentRecord } = data;
      return setStundentRecord(studentRecord);
    } else setStundentRecord([]);
  }, [accessToken, studentId, subject, year]);

  const getExamRecord = useCallback(async () => {
    const data = await loadExamListFetcher(year, accessToken);
    if (data && data.code === 200) {
      const { data: examList } = data;
      setExamList(examList.data);
    } else {
      setExamList([]);
    }
  }, [accessToken, year]);

  const recordData = useMemo(() => {
    if (studentRecord.length === 0 || examList.length === 0) return null;
    const record = [];
    for (const exam of examList) {
      const data = studentRecord.find((rec) => rec.examId === exam.examId);
      if (data) {
        record.push({ ...data, ...exam });
      }
    }
    return record;
  }, [studentRecord, examList]);

  const navigate = useNavigate();
  const setCurrentStudent = useSetRecoilState(currentStudentAtom); //

  const selectChangeHandler = useCallback(
    (e: any, key: string) => {
      const { value } = e.target;
      if (key === "subject") {
        setCurrentSubjectInfo((cur) => ({ ...cur, subject: value }));
      } else if (key === "year") {
        setCurrentSubjectInfo((cur) => ({ ...cur, year: value }));
      }
    },
    [setCurrentSubjectInfo],
  );

  tempData = tempData.map((data) => ({
    ...data,
    date: data.date.split("-").slice(1).join("/"),
  }));

  const graph = useMemo(() => {
    if (recordData === null) {
      return <NoDataDiv>데이터가 없습니다.</NoDataDiv>;
    }

    const sortedData =
      serachExamWord === ""
        ? recordData
        : recordData.filter((data) => data.examName.includes(serachExamWord));
    return (
      <>
        <InfoSelect
          onChange={(e) => selectChangeHandler(e, "year")}
          style={{ width: "9.1rem" }}
        >
          <option>2022</option>
        </InfoSelect>
        <Graph data={sortedData} />
      </>
    );
  }, [recordData, selectChangeHandler, serachExamWord]);

  const table = useMemo(() => {
    if (recordData === null) {
      return <NoDataDiv>데이터가 없습니다.</NoDataDiv>;
    }
    const sortedData =
      serachExamWord === ""
        ? recordData
        : recordData.filter((data) => data.examName.includes(serachExamWord));

    return <Table columns={STUDENT_COLUMNS} data={sortedData} />;
  }, [recordData, serachExamWord]);

  const goBackHandler = () => {
    navigate("/students");
  };
  const appendRecord = () => {
    setModalOpen(true);
    setModalState(currentModal.APPEND_RECORD);
  };
  useEffect(() => {
    setCurrentStudent(TEST_INFO);
  }, []);

  return (
    <AuthLayout>
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
            <InfoSelect
              onChange={(e) => selectChangeHandler(e, "subject")}
              style={{ width: "17.6rem" }}
            >
              {TEST_INFO?.subject.split(",").map((subject) => (
                <option>{subject}</option>
              ))}
            </InfoSelect>
          </SchoolWrapper>
          <GraphWrapper>{graph}</GraphWrapper>
          <hr></hr>
          <TableWrapper>
            <SerachHeader>
              <div>
                <SearchExamInput
                  value={serachExamWord}
                  onChange={(e) => setSearchExamWord(e.target.value)}
                  placeholder="시험 이름"
                />
                <SearchExamButton>검색</SearchExamButton>
              </div>
              <AppendRecord onClick={appendRecord}>
                <AppendNormal />
                성적 추가하기
              </AppendRecord>
            </SerachHeader>
            {table}
          </TableWrapper>
        </Wrapper>
      )}
    </AuthLayout>
  );
}

const NoDataDiv = styled.div`
  width: 89.5rem;
  height: 35.6rem;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  margin: 0 auto;
  text-align: center;
`;

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

export const TableWrapper = styled.div`
  margin: 20px 0 40px 0;
`;

export const SerachHeader = styled.div`
  width: 89.5rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 3rem;
`;

export const SearchExamInput = styled.input`
  width: 29.6rem;
  height: 4.2rem;

  background: #ffffff;
  /* gray/lightgray */

  border: 1px solid var(--grey);
  border-radius: 6px;
  padding: 8px 12px;
`;

export const SearchExamButton = styled.button`
  width: 7.2rem;
  height: 4.2rem;

  /* Gray 4 */

  background: var(--grey);
  border-radius: 6px;

  color: white;
  border: none;

  font-style: normal;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 2.4rem;
  margin-left: 8px;
`;

const AppendRecord = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;

  width: 13.7rem;
  height: 4.2rem;

  /* secondary/white */

  background: #ffffff;
  /* Gray 4 */

  border: 1px solid var(--grey);
  border-radius: 6px;

  font-style: normal;
  font-weight: 500;
  font-size: 14px;
  line-height: 24px;
`;
