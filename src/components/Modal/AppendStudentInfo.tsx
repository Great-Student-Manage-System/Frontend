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
    e: React.ChangeEvent<HTMLInputElement>,
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
        />
      </div>
      <div>
        <label>학교</label>
        <input
          onChange={(e) => handleOnChange(e, "school")}
          value={infoObject.school}
          placeholder="학교이름"
        />
      </div>
      <div>
        <label>학년</label>
        <input
          onChange={(e) => handleOnChange(e, "grade")}
          value={infoObject.grade}
          placeholder="학년"
        />
      </div>
      <div>
        <label>선택과목</label>
        <input
          onChange={(e) => handleOnChange(e, "subjects")}
          value={infoObject.subjects}
          placeholder="선택과목"
        />
      </div>
    </div>
  );
}
export default AppentStudentInfo;
