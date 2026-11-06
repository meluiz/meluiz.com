import { Frame, Header } from '@/components/layout';

const Layout = async (props: LayoutProps<'/'>) => {
  const { children } = props;

  return <Frame header={<Header />}>{children}</Frame>;
};

export default Layout;

/* ///////////////////////////////////////////////// */

// The header renders the visitors counter into the static HTML, so the pages regenerate in the
// background on the same interval as the visitors service (REVALIDATE_SECONDS). Must be a literal
export const revalidate = 10;
