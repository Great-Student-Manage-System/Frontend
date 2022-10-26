import { openModalAtom } from "@recoil/atom";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import {
  currentStudentAtom,
  currentStudentInfoAtom,
} from "@recoil/currentStudentInfo";
import useExamList from "@hooks/useExamList";
import { useState } from "react";
import { appendStudentRecordFetcher } from "@apis/api";
import { getLocalStorageValue } from "@utility/storage";

function AppendRecordModal() {
  const accessToken = getLocalStorageValue("token") ?? "";
  const {
    studentId,
    grade,
    subject: studentSubject,
  } = useRecoilValue(currentStudentAtom);
  const setOpenModal = useSetRecoilState<boolean>(openModalAtom);
  const [appendRecordInfo, setAppendRecordInfo] = useState<{
    [key: string]: string;
  }>({});

  const { year } = useRecoilValue(currentStudentInfoAtom);

  const { result: examList } = useExamList(year);

  const appendStuedntSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { examId, subject, examScore } = appendRecordInfo;
    const props = {
      studentId,
      accessToken,
      examId: Number(examId),
      subject,
      examScore: Number(examScore),
    };
    const data = await appendStudentRecordFetcher(props);
    console.log(data);
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    key: string,
  ) => {
    const { value } = e.target;
    setAppendRecordInfo((cur) => ({ ...cur, [key]: value }));
  };

  return (
    <StudentModalWrapper>
      <StudentModalTitle>성적 추가하기</StudentModalTitle>
      <AppendForm onSubmit={appendStuedntSubmit}>
        <StudentInfoWrapper style={{ display: "flex" }}>
          <div>
            <StudentInfoLabel>시험</StudentInfoLabel>
            <StudentInfoSelect
              onChange={(e) => handleOnChange(e, "examId")}
              required={true}
            >
              {examList.map(({ examId, examName }) => (
                <option value={examId}>{examName}</option>
              ))}
            </StudentInfoSelect>
          </div>
          <div>
            <StudentInfoLabel>학년</StudentInfoLabel>
            <StudentInfoInput placeholder="학년" value={grade} readOnly />
          </div>
          <div>
            <StudentInfoLabel>선택과목</StudentInfoLabel>
            <StudentInfoSelect
              onChange={(e) => handleOnChange(e, "subject")}
              required={true}
            >
              {studentSubject.split(",").map((value) => (
                <option value={value} selected>
                  {value}
                </option>
              ))}
            </StudentInfoSelect>
          </div>
          <div>
            <StudentInfoLabel>점수</StudentInfoLabel>
            {/* /** 선생 값 설정이 된다면 해당 값에 맞춰 선택과목 추가가 되어야 함. */}
            <StudentInfoInput
              onChange={(e) => handleOnChange(e, "examScore")}
              value={appendRecordInfo["appendRecordInfo"]}
              placeholder="시험 점수"
              type="number"
              max={100}
              min={0}
              required={true}
            />
          </div>
        </StudentInfoWrapper>
        {/* <AppendItemButton
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <img src={appendIcon} alt="추가 이미지" />
          <span>항목추가하기</span>
        </AppendItemButton> */}
        <SubmitContainer>
          <SubmitCancelButton
            onClick={(e) => {
              e.preventDefault();
              setOpenModal((cur) => !cur);
            }}
          >
            취소
          </SubmitCancelButton>
          <SubmitButton type="submit">완료</SubmitButton>
        </SubmitContainer>
      </AppendForm>
    </StudentModalWrapper>
  );
}

export default AppendRecordModal;

const StudentModalWrapper = styled.div`
  width: 75.7rem;
  height: auto;
  background-color: white;
  border-radius: 1.2rem;
  padding: 2.5rem 3.2rem 2.5rem 3.6rem;
  z-index: 102;
  max-height: 80%;
  overflow-y: auto;
`;

const StudentModalTitle = styled.p`
  font-style: normal;
  font-weight: 700;
  font-size: 1.8rem;
  line-height: 3.2rem;
  /* identical to box height, or 178% */

  letter-spacing: -0.25px;

  /* secondary/black */

  color: #000000;
`;
const StudentInfoWrapper = styled.div`
  display: flex;

  margin: 4rem 0 1.6rem 0;
`;

const StudentInfoLabel = styled.label`
  font-style: normal;
  font-weight: 700;
  font-size: 1.4rem;
  line-height: 2.4rem;
  /* identical to box height, or 171% */

  letter-spacing: -0.25px;

  /* secondary/black */

  color: #000000;
`;

const StudentInfoInput = styled.input`
  width: 16rem;
  height: 4.2rem;

  font-style: normal;
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2.4rem;

  border: 1px solid var(--grey);
  border-radius: 6px;

  padding: 0 1.2rem;
  margin-right: 1.6rem;
`;

const StudentInfoSelect = styled.select`
  width: 16rem;
  height: 4.2rem;

  font-style: normal;
  font-weight: 500;
  font-size: 1.4rem;
  line-height: 2.4rem;

  border: 1px solid var(--grey);
  border-radius: 6px;

  padding: 0 1.2rem;
  margin-right: 1.6rem;
`;
const AppendItemButton = styled.div`
  display: flex;
  align-items: center;
  cursor: pointer;

  span {
    margin-left: 1rem;
    color: var(--primary);
    font-style: normal;
    font-weight: 600;
    font-size: 1.4rem;
    line-height: 2.4rem;
  }
`;

const SubmitContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 4rem;
`;

const SubmitButton = styled.button`
  /* secondary/white */
  width: 7.1rem;
  height: 4.2rem;
  background: var(--primary);
  /* gray/lightgray */
  color: #ffffff;
  border: none;
  border-radius: 6px;
`;
const SubmitCancelButton = styled.button`
  /* secondary/white */
  width: 4.6rem;
  height: 4.2rem;
  background: #ffffff;
  /* gray/lightgray */

  border: 1px solid var(--grey);
  border-radius: 6px;
`;

const AppendForm = styled.form``;
