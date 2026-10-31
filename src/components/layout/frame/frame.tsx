import type { ReactNode } from 'react';

import { Footer } from '../footer';
import { Scrollview } from '../scrollview';
import { SkipContent } from '../skip-content';

export interface FrameProps {
  header: ReactNode;
  children: ReactNode;
}

export const Frame = (props: FrameProps) => {
  const { header, children } = props;

  return (
    <Scrollview>
      <SkipContent target="#__APP_MAIN" />
      {header}
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
