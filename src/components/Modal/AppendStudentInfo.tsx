import {
  appendStudentAtom,
  appendStudentInfoProps,
} from "@recoil/appendStudentAtom";
import { useState, useEffect } from "react";
import { useSetRecoilState } from "recoil";

interface AppendInfo {
  studentInfo: appendStudentInfoProps;
  order: string;
}

function AppentStudentInfo({ studentInfo, order }: AppendInfo) {
  const [infoObject, setInfoObject] =
    useState<appendStudentInfoProps>(studentInfo);
  const setApendStudent = useSetRecoilState(appendStudentAtom);

  useEffect(() => {
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
    <div style={{ display: "flex" }}>
      <div>
        <label>이름</label>
        <input
          onChange={(e) => handleOnChange(e, "email")}
          value={infoObject.email}
          placeholder="학생이름"
          required={true}
        />
      </div>
      <div>
        <label>학교</label>
        <input
          onChange={(e) => handleOnChange(e, "school")}
          value={infoObject.school}
          placeholder="학교이름"
          required={true}
        />
      </div>
      <div>
        <label>학년</label>
        <select onChange={(e) => handleOnChange(e, "grade")} required={true}>
          <option hidden={true}>학년을 선택해주세요</option>
          <option value={1}>1학년</option>
          <option value={2}>2학년</option>
          <option value={3}>3학년</option>
          <option value={4}>재수</option>
          <option value={5}>N수</option>
        </select>
      </div>
      <div>
        <label>선택과목</label>
        {/* /** 선생 값 설정이 된다면 해당 값에 맞춰 선택과목 추가가 되어야 함. */}
        <input
          onChange={(e) => handleOnChange(e, "subjects")}
          value={infoObject.subjects}
          placeholder="선택과목"
          required={true}
        />
      </div>
    </div>
  );
}
export default AppentStudentInfo;
