import type { VariantsOf } from '@/utils/styles';

import { mergeProps, useRender } from '@base-ui/react';
import { IconArrowLeft, IconArrowRight } from '@central-icons/outlined-sharp';
import { Fragment } from 'react';

import { parts } from './pagination.anatomy';
import * as styles from './pagination.styles';

/* ///////////////////////////////////////////////// */

export type PageSlot = number | 'ellipsis-start' | 'ellipsis-end';

export interface CreatePagesOptions {
  siblings?: number;
  boundaries?: number;
}

const range = (start: number, end: number) => {
  return Array.from({ length: Math.max(end - start + 1, 0) }, (_, index) => start + index);
};

export const createPages = (
  page: number,
  total: number,
  options: CreatePagesOptions = {},
): PageSlot[] => {
  const { siblings = 1, boundaries = 1 } = options;

  const startPages = range(1, Math.min(boundaries, total));
  const endPages = range(Math.max(total - boundaries + 1, boundaries + 1), total);

  const siblingsStart = Math.max(
    Math.min(page - siblings, total - boundaries - siblings * 2 - 1),
    boundaries + 2,
  );

  const siblingsEnd = Math.min(
    Math.max(page + siblings, boundaries + siblings * 2 + 2),
    endPages.length > 0 ? endPages[0] - 2 : total - 1,
  );

  const start: PageSlot[] =
    siblingsStart > boundaries + 2
      ? ['ellipsis-start']
      : boundaries + 1 < total - boundaries
        ? [boundaries + 1]
        : [];

  const end: PageSlot[] =
    siblingsEnd < total - boundaries - 1
      ? ['ellipsis-end']
      : total - boundaries > boundaries
        ? [total - boundaries]
        : [];

  return [...startPages, ...start, ...range(siblingsStart, siblingsEnd), ...end, ...endPages];
};

/* ///////////////////////////////////////////////// */

export type RootBaseProps = VariantsOf<typeof styles.root>;
export type RootProps = useRender.ComponentProps<'nav'> & RootBaseProps;

export const Root = (props: RootProps) => {
  const { className, render, ...rest } = props;

  const rootProps = {
    'aria-label': 'pagination',
  };

  return useRender({
    render,
    defaultTagName: 'nav',
    props: mergeProps(parts.root.attrs, rootProps, rest, {
      className: styles.root({ className }),
    }),
  });
};

/* ///////////////////////////////////////////////// */

export type ListBaseProps = VariantsOf<typeof styles.list>;
export type ListProps = useRender.ComponentProps<'ol'> & ListBaseProps;

export const List = (props: ListProps) => {
  const { className, render, ...rest } = props;

  return useRender({
    render,
    defaultTagName: 'ol',
    props: mergeProps(parts.list.attrs, rest, {
      className: styles.list({ className }),
    }),
  });
};

/* ///////////////////////////////////////////////// */

export type ItemBaseProps = VariantsOf<typeof styles.item>;
export type ItemProps = useRender.ComponentProps<'li'> & ItemBaseProps;

export const Item = (props: ItemProps) => {
  const { className, render, ...rest } = props;

  return useRender({
    render,
    defaultTagName: 'li',
    props: mergeProps(parts.item.attrs, rest, {
      className: styles.item({ className }),
    }),
  });
};

/* ///////////////////////////////////////////////// */

export type LinkBaseProps = VariantsOf<typeof styles.link> & {
  current?: boolean;
};

export type LinkProps = useRender.ComponentProps<'a'> & LinkBaseProps;

export const Link = (props: LinkProps) => {
  const { className, current = false, render, ...rest } = props;

  const linkProps = {
    'aria-current': current ? ('page' as const) : undefined,
  };

  return useRender({
    render,
    defaultTagName: 'a',
    props: mergeProps(parts.link.attrs, linkProps, rest, {
      className: styles.link({ className }),
    }),
  });
};

/* ///////////////////////////////////////////////// */

export type PreviousBaseProps = VariantsOf<typeof styles.previous>;
export type PreviousProps = useRender.ComponentProps<'a'> & PreviousBaseProps;

export const Previous = (props: PreviousProps) => {
  const { className, render, ...rest } = props;

  const previousProps = {
    'aria-label': 'Previous page',
  };

  return useRender({
    render,
    defaultTagName: 'a',
    props: mergeProps(parts.previous.attrs, previousProps, rest, {
      className: styles.previous({ className }),
      children: <IconArrowLeft />,
    }),
  });
};

/* ///////////////////////////////////////////////// */

export type NextBaseProps = VariantsOf<typeof styles.next>;
export type NextProps = useRender.ComponentProps<'a'> & NextBaseProps;

export const Next = (props: NextProps) => {
  const { className, render, ...rest } = props;

  const nextProps = {
    'aria-label': 'Next page',
  };

  return useRender({
    render,
    defaultTagName: 'a',
    props: mergeProps(parts.next.attrs, nextProps, rest, {
      className: styles.next({ className }),
      children: <IconArrowRight />,
    }),
  });
};

/* ///////////////////////////////////////////////// */

export type EllipsisBaseProps = VariantsOf<typeof styles.ellipsis>;
export type EllipsisProps = useRender.ComponentProps<'span'> & EllipsisBaseProps;

export const Ellipsis = (props: EllipsisProps) => {
  const { className, render, ...rest } = props;

  const ellipsisProps = {
    'aria-hidden': 'true',
    role: 'presentation',
  };

  return useRender({
    render,
    defaultTagName: 'span',
    props: mergeProps(parts.ellipsis.attrs, ellipsisProps, rest, {
      className: styles.ellipsis({ className }),
      children: (
        <Fragment>
          …<span className="sr-only">More pages</span>
        </Fragment>
      ),
    }),
  });
};
