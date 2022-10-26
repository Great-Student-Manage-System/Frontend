import {
  appendRecordAtom,
  appendRecordInfoProps,
  initialRecordInfo,
} from "@recoil/appendRecordAtom";
import { currentStudentAtom } from "@recoil/currentStudentInfo";
import { myInfoAtom } from "@recoil/myInfoatom";
import { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

interface StudentStandardInfo {
  schoolYear: number;
  subject: string[];
}

function AppendRecordInfo({ schoolYear, subject }: StudentStandardInfo) {
  const [infoObject, setInfoObject] =
    useState<appendRecordInfoProps>(initialRecordInfo);
  const setAppendRecord = useSetRecoilState(appendRecordAtom);

  const currentStudent = useRecoilValue(currentStudentAtom);
  const myInfo = useRecoilValue(myInfoAtom);

  useEffect(() => {
    setAppendRecord((prev) => ({ ...prev, infoObject }));
  }, [infoObject, setAppendRecord]); // 매핑해서 사용?

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    key: string,
  ) => {
    const { value } = e.target;
    setInfoObject((cur) => ({ ...cur, [key]: value }));
  };

  return (
    <StudentInfoWrapper style={{ display: "flex" }}>
      <div>
        <StudentInfoLabel>시험</StudentInfoLabel>
        <StudentInfoInput
          onChange={(e) => handleOnChange(e, "examId")}
          value={infoObject.examId}
          placeholder="시험"
          required={true}
        />
      </div>
      <div>
        <StudentInfoLabel>학년</StudentInfoLabel>
        <StudentInfoInput placeholder="학년" value={schoolYear} readOnly />
      </div>
      <div>
        <StudentInfoLabel>선택과목</StudentInfoLabel>
        <StudentInfoSelect
          onChange={(e) => handleOnChange(e, "subject")}
          required={true}
        >
          {subject.map((ele) => (
            <option value={ele}>{ele}</option>
          ))}
        </StudentInfoSelect>
      </div>
      <div>
        <StudentInfoLabel>점수</StudentInfoLabel>
        {/* /** 선생 값 설정이 된다면 해당 값에 맞춰 선택과목 추가가 되어야 함. */}
        <StudentInfoInput
          onChange={(e) => handleOnChange(e, "examResult")}
          value={infoObject.examResult}
          placeholder="시험 점수"
          type="number"
          max={100}
          min={0}
          required={true}
        />
      </div>
    </StudentInfoWrapper>
  );
}

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
export default AppendRecordInfo;
