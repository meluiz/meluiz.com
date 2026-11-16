'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment } from 'react';

import { Breadcrumb } from '@/components/ui';

export type SegmentProps = React.PropsWithChildren<{
  /** Readable labels keyed by href, e.g. a craft's title for its slug. */
  labels?: Partial<Record<string, string>>;
}>;

export const Segments = (props: SegmentProps) => {
  const { children, labels } = props;

  const pathname = usePathname();
  const segments = Breadcrumb.createSegments(pathname, { labels });

  if (segments == null) {
    return children;
  }

  return (
    <Breadcrumb.Root>
      <Breadcrumb.List>
        {segments.map((segment, index) => {
          const isLast = index === segments.length - 1;

          return (
            <Fragment key={segment.href}>
              <Breadcrumb.Item>
                {isLast ? (
                  <Breadcrumb.Page>{segment.label}</Breadcrumb.Page>
                ) : (
                  <Breadcrumb.Link render={<Link href={segment.href} />}>
                    {segment.label}
                  </Breadcrumb.Link>
                )}
              </Breadcrumb.Item>
              {!isLast && <Breadcrumb.Separator />}
            </Fragment>
          );
        })}
      </Breadcrumb.List>
    </Breadcrumb.Root>
  );
};
