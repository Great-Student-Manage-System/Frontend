import Contents from "@components/layouts/Contents";
import Main from "@components/layouts/Main";
import Section from "@components/layouts/Section";
import { PropsWithChildren } from "react";

function Layout({ children }: PropsWithChildren) {
  return (
    <Main>
      <Section>
        <Contents>{children}</Contents>
      </Section>
    </Main>
  );
}

export default Layout;
