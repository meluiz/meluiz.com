'use client';

import type { IndividualKey } from '@tanstack/react-hotkeys';
import type { VariantsOf } from '@/utils/styles';

import { mergeProps, useRender } from '@base-ui/react';
import { formatForDisplay } from '@tanstack/react-hotkeys';
import { Fragment } from 'react';

import { parts } from './kbd.anatomy';
import { root } from './kbd.styles';

export type KbdBaseProps = VariantsOf<typeof root> & {
  hotkey: IndividualKey;
};

export type KbdProps = Omit<useRender.ComponentProps<'kbd'>, 'children'> & KbdBaseProps;

export const Kbd = (props: KbdProps) => {
  const { className, hotkey, size, render, ...rest } = props;

  const title = formatForDisplay(hotkey, { useSymbols: false });
  const symbol = formatForDisplay(hotkey, { useSymbols: true });

  const children = (
    <Fragment>
      <span aria-hidden>{symbol}</span>
      <span className="sr-only">{title}</span>
    </Fragment>
  );

  return useRender({
    defaultTagName: 'kbd',
    render,
    props: mergeProps(parts.root.attrs, rest, {
      title,
      children,
      className: root({ className, size }),
    }),
  });
};
