import Contents from "@components/layouts/Contents";
import Main from "@components/layouts/Main";
import Section from "@components/layouts/Section";

interface Props {
  children: JSX.Element;
}

function Layout({ children }: Props) {
  return (
    <Main>
      <Section>
        <Contents>{children}</Contents>
      </Section>
    </Main>
  );
}

export default Layout;
