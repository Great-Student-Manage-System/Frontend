import styled from "styled-components";

const ContentsContainer = styled.div`
  display: grid;
  grid-template-columns: auto;
  width: 100%;
  max-width: 1024px;
  margin: 0 auto;
`;

interface Props {
  children: JSX.Element;
}

function Contents({ children }: Props) {
  return <ContentsContainer>{children}</ContentsContainer>;
}

export default Contents;
