import { Frame, Header } from '@/components/layout';

const Layout = async (props: LayoutProps<'/'>) => {
  const { children } = props;

  return <Frame header={<Header />}>{children}</Frame>;
};

export default Layout;

/* ///////////////////////////////////////////////// */

// The header renders the visitors counter into the static HTML, so the pages regenerate in the
// background every 10 seconds. This is the only cache for the visitors data. Must be a literal
export const revalidate = 10;
