import { mergeProps, ScrollArea as ScrollAreaBase } from '@base-ui/react';

import { parts } from './scroll-area.anatomy';
import * as styles from './scroll-area.styles';

/* ///////////////////////////////////////////////// */

export type RootProps = ScrollAreaBase.Root.Props;

export const Root = (props: RootProps) => {
  const { className, ...rest } = props;

  return (
    <ScrollAreaBase.Root
      {...mergeProps(parts.root.attrs, rest)}
      className={styles.root({ className })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type ViewportProps = ScrollAreaBase.Viewport.Props;

export const Viewport = (props: ViewportProps) => {
  const { className, ...rest } = props;

  return (
    <ScrollAreaBase.Viewport
      {...mergeProps(parts.viewport.attrs, rest)}
      className={styles.viewport({ className })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type ContentProps = ScrollAreaBase.Content.Props;

export const Content = (props: ContentProps) => {
  const { className, ...rest } = props;

  return (
    <ScrollAreaBase.Content
      {...mergeProps(parts.content.attrs, rest)}
      className={styles.content({ className })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type ScrollbarProps = ScrollAreaBase.Scrollbar.Props;

export const Scrollbar = (props: ScrollbarProps) => {
  const { className, ...rest } = props;

  return (
    <ScrollAreaBase.Scrollbar
      {...mergeProps(parts.scrollbar.attrs, rest)}
      className={styles.scrollbar({ className })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type ThumbProps = ScrollAreaBase.Thumb.Props;

export const Thumb = (props: ThumbProps) => {
  const { className, ...rest } = props;

  return (
    <ScrollAreaBase.Thumb
      {...mergeProps(parts.thumb.attrs, rest)}
      className={styles.thumb({ className })}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type CornerProps = ScrollAreaBase.Corner.Props;

export const Corner = (props: CornerProps) => {
  const { className, ...rest } = props;

  return (
    <ScrollAreaBase.Corner
      {...mergeProps(parts.corner.attrs, rest)}
      className={styles.corner({ className })}
    />
  );
};
