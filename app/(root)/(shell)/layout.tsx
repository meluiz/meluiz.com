import { Frame, Header } from '@/components/layout';

const Layout = async (props: LayoutProps<'/'>) => {
  const { children } = props;

  return <Frame header={<Header />}>{children}</Frame>;
};

export default Layout;
