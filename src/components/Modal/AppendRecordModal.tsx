import { openModalAtom } from "@recoil/atom";
import { useMemo } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import appendIcon from "@images/Icon/append_Icon.svg";
import AppendRecordInfo from "./AppendRecordInfo";
import { currentStudentAtom } from "@recoil/currentStudentInfo";
import { appendRecordAtom } from "@recoil/appendRecordAtom";

function AppendRecordModal() {
  const currentStudent = useRecoilValue(currentStudentAtom);
  const setOpenModal = useSetRecoilState<boolean>(openModalAtom);
  const appendRecordInfo = useRecoilValue(appendRecordAtom);

  const studentInfoForm = useMemo(
    () => (
      <AppendRecordInfo
        schoolYear={currentStudent.grade}
        subject={currentStudent.subject.split(",")}
      />
    ),
    [],
  );

  const appendStuedntSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // 여기서 학생 성적 받아서 같이 쏴줘야 함.
    console.log(appendRecordInfo);
  };

  return (
    <StudentModalWrapper>
      <StudentModalTitle>성적 추가하기</StudentModalTitle>
      <AppendForm onSubmit={appendStuedntSubmit}>
        {studentInfoForm}
        <AppendItemButton
          onClick={(e) => {
            e.preventDefault();
          }}
        >
          <img src={appendIcon} alt="추가 이미지" />
          <span>항목추가하기</span>
        </AppendItemButton>
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
