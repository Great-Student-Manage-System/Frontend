import styled from "styled-components";
import { examsTypes } from "@recoil/examsRecoil";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
const TR = styled.tr`
  height: 100%
  padding: 3px;
  width: 500px;
  height: 40px;
`;

const TD = styled.td`
  padding: 3px;
  height: 10px;

  .logo {
    text-align: center;
    cursor: pointer;
    vertical-align: middle;
  }
`;

const Exam = (props: examsTypes) => {
  const { examId, examName, schoolYear, subject } = props;
  const navigation = useNavigate();
  const goCurrentExamtDetail = useCallback(() => {
    navigation(`/exams/${examId}`);
  }, [navigation, props]);
  return (
    <>
      <TR onClick={goCurrentExamtDetail}>
        <TD>{examName}</TD>
        <TD> {`${schoolYear}학년`}</TD>
        <TD>{subject}</TD>
      </TR>
    </>
  );
};

export default Exam;
