import styled from "styled-components";

const HeadTitle = styled.div`
  font-weight: 700;
  font-size: 3.6rem;
  line-height: 4rem;
  margin: 16rem auto 10rem auto;
  font-style: normal;
  line-height: 4.5rem;
`;

function Header({ title }: { title: string }) {
  return <HeadTitle>{title}</HeadTitle>;
}

export default Header;
