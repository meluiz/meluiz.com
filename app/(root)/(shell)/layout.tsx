import { Footer, Header, Scrollview, SkipContent } from '@/components/layout';

const Layout = async (props: LayoutProps<'/'>) => {
  const { children } = props;

  return (
    <Scrollview>
      <SkipContent target="#__APP_MAIN" />
      <Header />
      <main
        id="__APP_MAIN"
        tabIndex={-1}
        className="relative flex w-full flex-1 bg-surface text-foreground outline-hidden"
      >
        {children}
      </main>
      <Footer />
    </Scrollview>
  );
};

export default Layout;
