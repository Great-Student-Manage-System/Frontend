import React from "react";
import URLRoutes from "@pages/Routes";
import GlobalStyle from "@style/GlobalStyle";
import Overlay from "@components/Modal/Overlay";
import Modal from "@components/Modal/Modal";

function App() {
  return (
    <>
      <GlobalStyle />
      <URLRoutes />
      <Overlay>
        <Modal />
      </Overlay>
    </>
  );
}

export default App;
