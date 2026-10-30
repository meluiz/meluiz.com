'use client';

import type { VariantsOf } from '@/utils/styles';
import type { UseMascotProps } from './use-mascot';

import { mergeProps, useRender } from '@base-ui/react';
import { Fragment } from 'react';

import { ariaAttr, dataAttr } from '@/utils/dom';

import { parts } from './mascot.anatomy';
import { body, eye, group, root } from './mascot.styles';
import { useMascot } from './use-mascot';

type MascotBaseProps = UseMascotProps &
  Omit<useRender.ElementProps<'svg'> & VariantsOf<typeof root>, 'children'>;

export type MascotProps = MascotBaseProps & {
  label?: string;
  size?: number | string;
};

export const Mascot = (props: MascotProps) => {
  const {
    ref,
    blink = false,
    follow = false,
    interval,
    label,
    size,
    className,
    style,
    ...rest
  } = props;

  const { rootRef, count, delay } = useMascot({ blink, follow, interval });

  const viewport = {
    width: size,
    height: size,
  };

  const element = useRender({
    defaultTagName: 'svg',
    ref: ref ? [ref, rootRef] : rootRef,
    props: mergeProps(parts.root.attrs, viewport, rest, {
      viewBox: '0 0 64 64',
      'aria-label': label,
      'aria-hidden': ariaAttr(!label),
      'data-blink': dataAttr(blink),
      'data-follow': dataAttr(follow),
      focusable: 'false',
      role: label ? 'img' : undefined,
      className: root({ className }),
      style: {
        ...style,
        '--mascot-blink-delay': `${delay}ms`,
      },
      children: (
        <Fragment>
          <path
            {...parts.body.attrs}
            className={body()}
            d="M30.6 3.4c14.1-1.2 29.7 8.7 30.3 26.4.6 16.5-10.4 30.9-28.1 31.1C16.3 61.1 3.4 50.4 3.1 33.7 2.8 17.2 15.8 4.6 30.6 3.4Z"
          />
          <g {...parts.group.attrs} className={group()}>
            <Fragment key={count}>
              <rect
                {...parts.eye.attrs}
                x={22.5}
                y={20}
                width="7"
                height="14"
                rx="3.5"
                className={eye()}
              />
              <rect
                {...parts.eye.attrs}
                x={37.5}
                y={20}
                width="7"
                height="14"
                rx="3.5"
                className={eye()}
              />
            </Fragment>
          </g>
        </Fragment>
      ),
    }),
  });

  return element;
};
