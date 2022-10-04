import React from "react";
import Header from "@components/Header";
import { useRecoilState } from "recoil";
import { modalState, openModalAtom } from "@recoil/atom";
import { currentModal } from "@data/currentModalState";

export default function Home() {
  const [isOpenModal, setOpenModal] = useRecoilState<boolean>(openModalAtom);

  const [currentModalState, setCurrentModalState] =
    useRecoilState<currentModal>(modalState);
  return (
    <div>
      <Header />
      <div style={{ marginTop: "200px" }}></div>
      <button
        onClick={(e) => {
          setOpenModal(true);
          setCurrentModalState(currentModal.APPEND_STUDENT);
        }}
      >
        APPENDMODAL
      </button>
      <button
        onClick={(e) => {
          setOpenModal(true);
          setCurrentModalState(currentModal.TEMP);
        }}
      >
        TEMP
      </button>
    </div>
  );
}
