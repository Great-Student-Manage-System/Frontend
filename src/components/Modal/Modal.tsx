import { currentModal } from "@data/currentModalState";
import { modalState, openModalAtom } from "@recoil/atom";
import { useMemo } from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import AppendStudentModal from "./AppendStudentModal";

function Modal() {
  const [isOpenModal, setOpenModal] = useRecoilState<boolean>(openModalAtom);
  // children에 값을 전달하는게 아니라 modal Data에 맞게
  // modal창을 전달하도록 설정.
  // 근데 그렇게 하기 위해서는 modal처리가 따로 필요하긴 함.
  const [currentModalState, setCurrentModalState] =
    useRecoilState<currentModal>(modalState);
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
      <Backdrop onClick={() => setOpenModal((cur) => !cur)} />
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

const DialogBox = styled.dialog`
  width: 800px;
  height: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  border: none;
  border-radius: 3px;
  box-shadow: 0 0 30px rgba(30, 30, 30, 0.185);
  box-sizing: border-box;
  background-color: white;
  z-index: 10000;
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
