import React, { useCallback, useState } from "react";
import { useSetRecoilState } from "recoil";
import { studentsTypes } from "@recoil/studentsRecoil";
import styled from "styled-components";
import { CgMoreO } from "react-icons/cg";
import { useNavigate } from "react-router-dom";
import { currentStudentAtom } from "@recoil/currentStudentInfo";
import EditModal from "@components/Modal/EditModal";

const TR = styled.tr`
  padding: 3px;
  width: 800px;
  height: 40px;
`;

const TD = styled.td`
  padding: 0;
  height: 10px;
  width: 200px;

  .logo {
    text-align: center;
    cursor: pointer;
    vertical-align: middle;
  }
`;

const ModalWrapper = styled.div`
  display: flex;
  width: 200px;
`;

const Student = (props: studentsTypes) => {
  const { studentId, name, school, grade, subjects } = props;
  const setCurrentStudent = useSetRecoilState(currentStudentAtom);

  const navigation = useNavigate();
  const goCurrentStudentDetail = useCallback(() => {
    setCurrentStudent(props);
    navigation(`/students/${studentId}`);
  }, [navigation, props, setCurrentStudent, studentId]);

  const [modal, setModal] = useState(false); // 여기서 modal 을 사용한 이유?

  return (
    <>
      <TR onClick={goCurrentStudentDetail}>
        <TD>{name}</TD>
        <TD>{school}</TD>
        <TD>{grade}학년</TD>
        <TD>{subjects}</TD>
        <TD>
          <ModalWrapper>
            <CgMoreO
              className="logo"
              size={22}
              color="#696969"
              onClick={() => {
                setModal(!modal);
              }}
            />
            {modal ? <EditModal /> : null}
          </ModalWrapper>
        </TD>
      </TR>
    </>
  );
};

export default Student;
