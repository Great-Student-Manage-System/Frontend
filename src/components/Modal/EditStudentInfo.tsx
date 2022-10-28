import { editStudentAtom, editStudentInfoProps } from "@recoil/editStudentAtom";
import { useState, useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

interface EditInfo {
  studentInfo: editStudentInfoProps;
  order: string;
}

function EditStudentInfo({ studentInfo, order }: EditInfo) {
  const [infoObject, setInfoObject] =
    useState<editStudentInfoProps>(studentInfo);
  const setApendStudent = useSetRecoilState(editStudentAtom);
  const appendStudent = useRecoilValue(editStudentAtom);

  useEffect(() => {
    console.log(appendStudent);
    setApendStudent((prev) => ({ ...prev, [order]: infoObject }));
  }, [infoObject, order, setApendStudent]); // 매핑해서 사용?

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
        <StudentInfoLabel>이름</StudentInfoLabel>
        <StudentInfoInput
          onChange={(e) => handleOnChange(e, "name")}
          value={infoObject.name}
          placeholder="학생이름"
          required={true}
        />
      </div>
      <div>
        <StudentInfoLabel>학교</StudentInfoLabel>
        <StudentInfoInput
          onChange={(e) => handleOnChange(e, "school")}
          value={infoObject.school}
          placeholder="학교이름"
          required={true}
        />
      </div>
      <div>
        <StudentInfoLabel>학년</StudentInfoLabel>
        <StudentInfoSelect
          onChange={(e) => handleOnChange(e, "schoolYear")}
          required={true}
        >
          <option hidden={true}>학년 </option>
          <option value={1}>1학년</option>
          <option value={2}>2학년</option>
          <option value={3}>3학년</option>
          <option value={4}>재수</option>
          <option value={5}>N수</option>
        </StudentInfoSelect>
      </div>
      <div>
        <StudentInfoLabel>선택과목</StudentInfoLabel>
        {/* /** 선생 값 설정이 된다면 해당 값에 맞춰 선택과목 추가가 되어야 함. */}
        <StudentInfoInput
          onChange={(e) => handleOnChange(e, "subjects")}
          value={infoObject.subjects}
          placeholder="선택과목"
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

export default EditStudentInfo;
