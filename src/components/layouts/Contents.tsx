import { PropsWithChildren } from "react";
import styled from "styled-components";

const ContentsContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  width: 100%;
  max-width: var(--content-width);
  margin: 0 auto;
`;

function Contents({ children }: PropsWithChildren) {
  return <ContentsContainer>{children}</ContentsContainer>;
}

export default Contents;
