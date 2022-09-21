import styled from "styled-components";

const SectionContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`;
interface Props {
  children: JSX.Element;
  id?: string;
}
function Section({ children, id }: Props) {
  return <SectionContainer id={id}>{children}</SectionContainer>;
}

export default Section;
