import {
  appendStudentAtom,
  initialStudentInfo,
} from "@recoil/appendStudentAtom";
import { openModalAtom } from "@recoil/atom";
import { useMemo } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import AppentStudentInfo from "./AppendStudentInfo";

function AppendStudentModal() {
  const [initialValue, setInitialValue] = useRecoilState(appendStudentAtom);
  const setOpenModal = useSetRecoilState<boolean>(openModalAtom);

  const studentInfoForm = useMemo(
    () =>
      Object.entries(initialValue).map(([key, value]) => (
        <AppentStudentInfo studentInfo={value} order={key} />
      )),
    [initialValue],
  );

  const appendStuedntSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(initialValue);
    setInitialValue({ [Date.now()]: initialStudentInfo });
  };

  return (
    <Wrapper>
      <p>학생 추가하기</p>
      <AppendForm onSubmit={appendStuedntSubmit}>
        {studentInfoForm}
        <button
          onClick={(e) => {
            e.preventDefault();
            setInitialValue((cur) => ({
              ...cur,
              [Date.now()]: initialStudentInfo,
            }));
          }}
        >
          항목추가하기
        </button>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              setOpenModal((cur) => !cur);
            }}
          >
            취소
          </button>
          <button type="submit">완료</button>
        </div>
      </AppendForm>
    </Wrapper>
  );
}

export default AppendStudentModal;

const Wrapper = styled.div`
  width: 75.7rem;
  height: auto;
  background-color: white;
  border-radius: 1.2rem;
  padding: 2.5rem 3.3rem;
  z-index: 102;
`;

const AppendForm = styled.form``;
