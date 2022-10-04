import { openModalAtom } from "@recoil/atom";
import { PropsWithChildren } from "react";
import { useRecoilValue } from "recoil";
import styled from "styled-components";

function Overlay({ children }: PropsWithChildren) {
  const isOpenModal = useRecoilValue(openModalAtom);
  return (
    <Main style={{ visibility: isOpenModal ? "visible" : "hidden" }}>
      {children}
    </Main>
  );
}

export default Overlay;

const Main = styled.main`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: auto;
  background-color: rgba(#000, 0.4);
  transition: visibility 0.3s, opacity 0.3s;
  z-index: 100;
`;
