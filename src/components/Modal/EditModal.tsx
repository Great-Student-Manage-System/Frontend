import { currentModal } from "@data/currentModalState";
import { openModalAtom, modalState } from "@recoil/atom";
import React, { useEffect, useRef } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  z-index: 9;
  margin: 2px 0 0 3px;
`;
const Button = styled.button`
  width: 60px;
  height: 30px;
  background-color: white;
  border: solid 1px;
  border-radius: 3px;
  font-weight: bold;
  padding: 0p;
`;

export default function EditModal({}) {
  const setOpenState = useSetRecoilState(openModalAtom);
  const setModalState = useSetRecoilState(modalState);
  return (
    <>
      <Wrapper>
        <Button
          onClick={() => {
            setOpenState(true);
            setModalState(currentModal.EDIT_STUDENT);
          }}
        >
          수정
        </Button>
        <Button onClick={() => console.log("삭제")}>삭제</Button>
      </Wrapper>
    </>
  );
}
function setModalState(APPEND_STUDENT: any) {
  throw new Error("Function not implemented.");
}

function setOpenState(arg0: boolean) {
  throw new Error("Function not implemented.");
}
