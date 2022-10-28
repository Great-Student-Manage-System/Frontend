import {
  editStudentAtom,
  initialEditStudentInfo,
} from "@recoil/editStudentAtom";
import { openModalAtom } from "@recoil/atom";
import { useMemo } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import AppentStudentInfo from "./AppendStudentInfo";
import { CgChevronDoubleLeft } from "react-icons/cg";
import { getLocalStorageValue } from "@utility/storage";
import { studentSelector } from "@recoil/studentsRecoil";

function EditStudentModal() {
  const [initialValue, setInitialValue] = useRecoilState(editStudentAtom);
  const setOpenModal = useSetRecoilState<boolean>(openModalAtom);

  const studentInfoForm = useMemo(
    () =>
      Object.entries(initialValue).map(([key, value]) => (
        <AppentStudentInfo studentInfo={value} order={key} />
      )),
    [initialValue],
  );

  const BASE_URL = "https://great.robinjoon.xyz";
  const accessToken = getLocalStorageValue("token") ?? "";

  const appendStuedntSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    for (const [key, value] of Object.entries(initialValue)) {
      await fetch(`${BASE_URL}/api/students`, {
        method: "POST",
        headers: {
          Authorization: accessToken,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          name: value.name,
          schoolYear: value.schoolYear,
          subjects: value.subjects,
          school: value.school,
        }),
      })
        .then((response) => response.json())
        .then((response) => setOpenModal((cur) => !cur))
        .then((result) => console.log(result));
    }
  };

  return (
    <StudentModalWrapper>
      <StudentModalTitle>학생 수정하기</StudentModalTitle>
      <AppendForm onSubmit={appendStuedntSubmit}>
        {studentInfoForm}
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

export default EditStudentModal;

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
