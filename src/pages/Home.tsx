import React from "react";
import Header from "@components/Main/Header";
import Navigation from "@components/Main/Navigation";
import { useRecoilState } from "recoil";
// import { modalState, openModalAtom } from "@recoil/atom";
import { currentModal } from "@data/currentModalState";

export default function Home() {
  // const [isOpenModal, setOpenModal] = useRecoilState<boolean>(openModalAtom);

  // const [currentModalState, setCurrentModalState] =
  //   useRecoilState<currentModal>(modalState);
  return (
    <div>
      <Header />
      <Navigation />
    </div>
  );
}
