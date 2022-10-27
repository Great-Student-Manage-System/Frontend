import { openModalAtom } from "@recoil/atom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";

import { currentStudentInfoAtom } from "@recoil/currentStudentInfo";
import useExamList from "@hooks/useExamList";
import { modifyStudentRecordFetcher } from "@apis/api";
import { getLocalStorageValue } from "@utility/storage";
import { modifyExamRecordAtom } from "@recoil/modifyExamRecordAtom";
import { useSWRConfig } from "swr";

function ModifyRecordModal() {
  const accessToken = getLocalStorageValue("token") ?? "";
  const { mutate } = useSWRConfig();
  const [
    { recordId, examId, examScore, studentId, schoolYear },
    setModifyRecordInfo,
  ] = useRecoilState(modifyExamRecordAtom);

  const setOpenModal = useSetRecoilState<boolean>(openModalAtom);

  const { subject, year } = useRecoilValue(currentStudentInfoAtom);

  const { result: examList } = useExamList(year);

  const modifyStuedntSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const props = {
      accessToken,
      examResult: examScore,
      recordId,
      examId,
      studentId,
    };
    const data = await modifyStudentRecordFetcher(props);
    if (data && data.code >= 200) {
      alert(data.response);
      mutate(`/api/students/${studentId}/${subject}/${year}`);
    } else if (data && data.code >= 400) {
      alert(data.response);
    }
    setOpenModal(false);
  };

  const handleOnChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
    key: string,
  ) => {
    const { value } = e.target;
    setModifyRecordInfo((cur) => ({ ...cur, [key]: value }));
  };

  return (
    <StudentModalWrapper>
      <StudentModalTitle>성적 수정하기</StudentModalTitle>
      <AppendForm onSubmit={modifyStuedntSubmit}>
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
            <StudentInfoInput placeholder="학년" value={schoolYear} readOnly />
          </div>
          <div>
            <StudentInfoLabel>선택과목</StudentInfoLabel>
            <StudentInfoInput placeholder="과목" value={subject} readOnly />
          </div>
          <div>
            <StudentInfoLabel>점수</StudentInfoLabel>
            <StudentInfoInput
              onChange={(e) => handleOnChange(e, "examScore")}
              value={examScore}
              placeholder="시험 점수"
              type="number"
              max={100}
              min={0}
              required={true}
            />
          </div>
        </StudentInfoWrapper>
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

export default ModifyRecordModal;

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
