'use client';

import type { VariantsOf } from '@/utils/styles';
import type { UseSectionProps } from './use-section';

import { mergeProps, useRender } from '@base-ui/react';

import { parts } from './section.anatomy';
import * as styles from './section.styles';
import { useSection } from './use-section';
import { SectionProvider, useSectionContext } from './use-section-context';

/* ///////////////////////////////////////////////// */

export type RootBaseProps = VariantsOf<typeof styles.root> & UseSectionProps;
export type RootProps = useRender.ComponentProps<'section'> & RootBaseProps;

export const Root = (props: RootProps) => {
  const { className, index, render, tone, id, ...rest } = props;

  const section = useSection({ id, index });

  const element = useRender({
    defaultTagName: 'section',
    render,
    props: mergeProps(parts.root.attrs, rest, {
      id: section.id,
      className: styles.root({ className, tone }),
      'aria-labelledby': section.titleId,
    }),
  });

  return <SectionProvider value={section}>{element}</SectionProvider>;
};

/* ///////////////////////////////////////////////// */

export type HeaderBaseProps = VariantsOf<typeof styles.header>;
export type HeaderProps = useRender.ComponentProps<'header'> & HeaderBaseProps;

export const Header = (props: HeaderProps) => {
  const { className, divided, inset, render, ...rest } = props;

  return useRender({
    defaultTagName: 'header',
    render,
    props: mergeProps(parts.header.attrs, rest, {
      className: styles.header({ className, divided, inset }),
    }),
  });
};

/* ///////////////////////////////////////////////// */

export type IndexBaseProps = VariantsOf<typeof styles.index>;
export type IndexProps = useRender.ComponentProps<'span'> & IndexBaseProps;

export const Index = (props: IndexProps) => {
  const { children, className, render, ...rest } = props;

  const section = useSectionContext();

  const value = children ?? section.index;

  const element = useRender({
    defaultTagName: 'span',
    render,
    props: mergeProps(parts.index.attrs, rest, {
      'aria-hidden': true,
      className: styles.index({ className }),
      children: value,
    }),
  });

  if (value === undefined) {
    return null;
  }

  return element;
};

/* ///////////////////////////////////////////////// */

export type TitleBaseProps = VariantsOf<typeof styles.title>;
export type TitleProps = useRender.ComponentProps<'h2'> & TitleBaseProps;

export const Title = (props: TitleProps) => {
  const { className, render, size, ...rest } = props;

  const section = useSectionContext();

  return useRender({
    defaultTagName: 'h2',
    render,
    props: mergeProps(parts.title.attrs, rest, {
      id: section.titleId,
      className: styles.title({ className, size }),
    }),
  });
};

/* ///////////////////////////////////////////////// */

export type DescriptionBaseProps = VariantsOf<typeof styles.description>;
export type DescriptionProps = useRender.ComponentProps<'p'> & DescriptionBaseProps;

export const Description = (props: DescriptionProps) => {
  const { className, indent, render, ...rest } = props;

  const section = useSectionContext();

  return useRender({
    defaultTagName: 'p',
    render,
    props: mergeProps(parts.description.attrs, rest, {
      id: section.descriptionId,
      className: styles.description({ className, indent }),
    }),
  });
};

/* ///////////////////////////////////////////////// */

export type BodyBaseProps = VariantsOf<typeof styles.body>;
export type BodyProps = useRender.ComponentProps<'div'> & BodyBaseProps;

export const Body = (props: BodyProps) => {
  const { className, indent, render, ...rest } = props;

  return useRender({
    defaultTagName: 'div',
    render,
    props: mergeProps(parts.body.attrs, rest, {
      className: styles.body({ className, indent }),
    }),
  });
};
