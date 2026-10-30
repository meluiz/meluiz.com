import { SkipContent } from '@/components/layout';

const Layout = async (props: LayoutProps<'/'>) => {
  const { children } = props;

  return (
    <div className="relative flex min-h-fit w-full flex-1 flex-col">
      <SkipContent target="#__APP_MAIN" />
      <main
        id="__APP_MAIN"
        tabIndex={-1}
        className="relative flex w-full flex-1 bg-surface text-foreground outline-hidden"
      >
        {children}
      </main>
    </div>
  );
};

export default Layout;
