import styled from "styled-components";

const MainContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

interface Props {
  children: JSX.Element;
}

function Main({ children }: Props) {
  return <MainContainer>{children}</MainContainer>;
}

export default Main;
