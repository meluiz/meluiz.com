import type { ReactNode } from 'react';

import { Fragment } from 'react';

import { Footer } from '../footer';
import { Scrollview } from '../scrollview';
import { SkipContent } from '../skip-content';

export interface FrameProps {
  header: ReactNode;
  children: ReactNode;
}

export const Frame = (props: FrameProps) => {
  const { header, children } = props;

  // The skip link sits outside the scroll viewport, which is focusable, so it stays the first
  // tab stop
  return (
    <Fragment>
      <SkipContent target="#__APP_MAIN" />
      <Scrollview>
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
    </Fragment>
  );
};
