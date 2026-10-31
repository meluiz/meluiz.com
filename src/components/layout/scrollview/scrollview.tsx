import type { ReactNode } from 'react';

import { ScrollArea } from '@/components/ui';

export interface ScrollviewProps {
  children: ReactNode;
}

export const Scrollview = (props: ScrollviewProps) => {
  const { children } = props;

  return (
    <ScrollArea.Root className="h-dvh w-full">
      <ScrollArea.Viewport className="isolate scroll-pt-18">
        <ScrollArea.Content>{children}</ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
};
