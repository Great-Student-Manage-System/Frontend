import styled from "styled-components";

const HeadTitle = styled.div`
  font-weight: 700;
  font-size: 36px;
  line-height: 40px;
`;

function Header({ children }: { children: JSX.Element }) {
  return <HeadTitle>{children}</HeadTitle>;
}

export default Header;
