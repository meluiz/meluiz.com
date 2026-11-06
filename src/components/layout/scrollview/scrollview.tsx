import type { ReactNode } from 'react';

import { ScrollArea } from '@/components/ui';

export interface ScrollviewProps {
  children: ReactNode;
}

export const Scrollview = (props: ScrollviewProps) => {
  const { children } = props;

  return (
    <ScrollArea.Root className="h-dvh w-full">
      {/* Base UI makes the viewport focusable so keyboard users can scroll it; name it so the
          tab stop isn't announced as an unlabeled element. `group` keeps the header and footer
          inside it as the page banner and contentinfo, which `region` would not */}
      <ScrollArea.Viewport role="group" aria-label="Page" className="isolate scroll-pt-18">
        <ScrollArea.Content>{children}</ScrollArea.Content>
      </ScrollArea.Viewport>
      <ScrollArea.Scrollbar orientation="vertical">
        <ScrollArea.Thumb />
      </ScrollArea.Scrollbar>
    </ScrollArea.Root>
  );
};
