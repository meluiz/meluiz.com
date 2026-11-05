import type { Route } from 'next';
import type { VariantsOf } from '@/utils/styles';

import { mergeProps, useRender } from '@base-ui/react';
import { IconDotGrid1x3Horizontal } from '@central-icons/outlined-sharp';
import { Fragment } from 'react';

import { parts } from './breadcrumb.anatomy';
import * as styles from './breadcrumb.styles';

/* ///////////////////////////////////////////////// */

export interface Segment {
  label: string;
  href: Route;
}

/* ///////////////////////////////////////////////// */

const decodeSegment = (segment: string) => {
  try {
    return decodeURIComponent(segment);
  } catch {
    return segment;
  }
};

const toAncestorRoutes = (pathname: string): Segment[] => {
  const parts = pathname.split('/').filter(Boolean);

  return parts.map((part, index) => ({
    href: `/${parts.slice(0, index + 1).join('/')}` as Route,
    label: decodeSegment(part),
  }));
};

/* ///////////////////////////////////////////////// */

export const createSegments = (pathname: string, rootLabel = 'meluiz'): Segment[] | null => {
  const ancestors = toAncestorRoutes(pathname);

  if (ancestors.length === 0) {
    return null;
  }

  return [
    {
      href: '/' as Route,
      label: rootLabel,
    },
    ...ancestors,
  ];
};

/* ///////////////////////////////////////////////// */

export type RootBaseProps = VariantsOf<typeof styles.root>;
export type RootProps = useRender.ComponentProps<'nav'> & RootBaseProps;

export const Root = (props: RootProps) => {
  const { className, render, ...rest } = props;

  const rootProps = {
    'aria-label': 'breadcrumb',
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

export type LinkBaseProps = VariantsOf<typeof styles.link>;
export type LinkProps = useRender.ComponentProps<'a'> & LinkBaseProps;

export const Link = (props: LinkProps) => {
  const { className, render, ...rest } = props;

  return useRender({
    render,
    defaultTagName: 'a',
    props: mergeProps(parts.link.attrs, rest, {
      className: styles.link({ className }),
    }),
  });
};

/* ///////////////////////////////////////////////// */

export type PageBaseProps = VariantsOf<typeof styles.page>;
export type PageProps = useRender.ComponentProps<'span'> & PageBaseProps;

export const Page = (props: PageProps) => {
  const { className, render, ...rest } = props;

  const pageProps = {
    'aria-current': 'page',
  };

  return useRender({
    render,
    defaultTagName: 'span',
    props: mergeProps(parts.page.attrs, pageProps, rest, {
      className: styles.page({ className }),
    }),
  });
};

/* ///////////////////////////////////////////////// */

export type SeparatorBaseProps = VariantsOf<typeof styles.separator>;
export type SeparatorProps = useRender.ComponentProps<'li'> & SeparatorBaseProps;

export const Separator = (props: SeparatorProps) => {
  const { className, render, children, ...rest } = props;

  const separatorProps = {
    'aria-hidden': 'true',
    role: 'presentation',
  };

  return useRender({
    render,
    defaultTagName: 'li',
    props: mergeProps(parts.separator.attrs, separatorProps, rest, {
      className: styles.separator({ className }),
      children: children ?? '/',
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
          <IconDotGrid1x3Horizontal />
          <span className="sr-only">More</span>
        </Fragment>
      ),
    }),
  });
};
