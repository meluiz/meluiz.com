import { mergeProps, ScrollArea as ScrollAreaBase } from '@base-ui/react';

import { parts } from './scroll-area.anatomy';
import * as styles from './scroll-area.styles';

/* ///////////////////////////////////////////////// */

export type RootProps = ScrollAreaBase.Root.Props;

export const Root = (props: RootProps) => {
  const { className, ...rest } = props;

  const rootProps = mergeProps(parts.root.attrs, rest);

  return <ScrollAreaBase.Root {...rootProps} className={styles.root({ className })} />;
};

/* ///////////////////////////////////////////////// */

export type ViewportProps = ScrollAreaBase.Viewport.Props;

export const Viewport = (props: ViewportProps) => {
  const { className, ...rest } = props;

  const viewportProps = mergeProps(parts.viewport.attrs, rest);

  return (
    <ScrollAreaBase.Viewport {...viewportProps} className={styles.viewport({ className })} />
  );
};

/* ///////////////////////////////////////////////// */

export type ContentProps = ScrollAreaBase.Content.Props;

export const Content = (props: ContentProps) => {
  const { className, ...rest } = props;

  const contentProps = mergeProps(parts.content.attrs, rest);

  return <ScrollAreaBase.Content {...contentProps} className={styles.content({ className })} />;
};

/* ///////////////////////////////////////////////// */

export type ScrollbarProps = ScrollAreaBase.Scrollbar.Props;

export const Scrollbar = (props: ScrollbarProps) => {
  const { className, ...rest } = props;

  const scrollbarProps = mergeProps(parts.scrollbar.attrs, rest);

  return (
    <ScrollAreaBase.Scrollbar {...scrollbarProps} className={styles.scrollbar({ className })} />
  );
};

/* ///////////////////////////////////////////////// */

export type ThumbProps = ScrollAreaBase.Thumb.Props;

export const Thumb = (props: ThumbProps) => {
  const { className, ...rest } = props;

  const thumbProps = mergeProps(parts.thumb.attrs, rest);

  return <ScrollAreaBase.Thumb {...thumbProps} className={styles.thumb({ className })} />;
};

/* ///////////////////////////////////////////////// */

export type CornerProps = ScrollAreaBase.Corner.Props;

export const Corner = (props: CornerProps) => {
  const { className, ...rest } = props;

  const cornerProps = mergeProps(parts.corner.attrs, rest);

  return <ScrollAreaBase.Corner {...cornerProps} className={styles.corner({ className })} />;
};
