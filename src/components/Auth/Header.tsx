import styled from "styled-components";

const HeadTitle = styled.div`
  font-weight: 700;
  font-size: 36px;
  line-height: 40px;
  margin: 160px auto 100px auto;
`;

function Header({ title }: { title: string }) {
  return <HeadTitle>{title}</HeadTitle>;
}

export default Header;
