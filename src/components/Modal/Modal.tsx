import { currentModal } from "@data/currentModalState";
import { modalState } from "@recoil/atom";
import { useMemo, useEffect } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";
import AppendStudentModal from "./AppendStudentModal";

function Modal() {
  // children에 값을 전달하는게 아니라 modal Data에 맞게
  // modal창을 전달하도록 설정.
  // 근데 그렇게 하기 위해서는 modal처리가 따로 필요하긴 함.

  // useEffect(() => {
  //   document.body.style.cssText = `
  //     position: fixed;
  //     top: -${window.scrollY}px;
  //     overflow-y: scroll;
  //     width: 100%;`;
  //   return () => {
  //     const scrollY = document.body.style.top;
  //     document.body.style.cssText = "";
  //     window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
  //   };
  // }, []);

  const currentModalState = useRecoilValue<currentModal>(modalState);
  const modalElement = useMemo(
    () => (
      <>
        {currentModalState === currentModal.APPEND_STUDENT ? (
          <AppendStudentModal />
        ) : currentModalState === currentModal.TEMP ? (
          <>temp</>
        ) : (
          <></>
        )}
      </>
    ),
    [currentModalState],
  );
  return (
    <ModalContainer>
      {modalElement}
      <Backdrop />
    </ModalContainer>
  );
}

const ModalContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  position: fixed;
`;

const Backdrop = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  z-index: 101;
  background-color: rgba(0, 0, 0, 0.2);
`;

export default Modal;
