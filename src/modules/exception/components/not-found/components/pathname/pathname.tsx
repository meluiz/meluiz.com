'use client';

import { usePathname } from 'next/navigation';

export interface PathnameProps {
  className?: string;
}

export const Pathname = (props: PathnameProps) => {
  const { className } = props;

  const pathname = usePathname();

  return (
    <code translate="no" className={className}>
      {pathname}
    </code>
  );
};
