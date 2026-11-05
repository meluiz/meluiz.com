'use client';

import type { VariantsOf } from '@/utils/styles';
import type { UseMascotProps } from './use-mascot';

import { mergeProps, useRender } from '@base-ui/react';
import { Fragment } from 'react';

import { ariaAttr, dataAttr } from '@/utils/dom';

import { parts } from './mascot.anatomy';
import { body, eye, group, mark, root } from './mascot.styles';
import { useMascot } from './use-mascot';

export type MascotMood = 'idle' | 'broken';

export type MascotBaseProps = VariantsOf<typeof root> &
  UseMascotProps & {
    label?: string;
    mood?: MascotMood;
    animated?: boolean;
    size?: number | string;
  };

export type MascotProps = Omit<useRender.ElementProps<'svg'>, 'children'> & MascotBaseProps;

export const Mascot = (props: MascotProps) => {
  const {
    ref,
    animated = false,
    blink = false,
    follow = false,
    interval,
    label,
    mood = 'idle',
    size,
    className,
    style,
    ...rest
  } = props;

  // A broken mascot has crossed-out eyes, so there is nothing to blink
  const shouldBlink = blink && mood === 'idle';

  const { rootRef, count, delay } = useMascot({ blink: shouldBlink, follow, interval });

  const isLooking = animated && mood === 'idle' && !follow;
  const isWobbling = animated && mood === 'broken';

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
      'data-blink': dataAttr(shouldBlink),
      'data-mood': mood,
      'data-follow': dataAttr(follow),
      'data-animated': dataAttr(animated),
      focusable: 'false',
      role: label ? 'img' : undefined,
      className: root({ className, animation: isWobbling ? 'wobble' : 'none' }),
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
          <g
            {...parts.group.attrs}
            className={group({ animation: isLooking ? 'look' : 'none' })}
          >
            {mood === 'broken' ? (
              <g strokeWidth="4.5" strokeLinecap="round">
                <path {...parts.mark.attrs} d="M20 19.5l9 9m0-9-9 9" className={mark()} />
                <path {...parts.mark.attrs} d="M35.5 19.5l9 9m0-9-9 9" className={mark()} />
                <path {...parts.mark.attrs} d="M22 45c6-5 14.5-5 20.5 0" className={mark()} />
              </g>
            ) : (
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
            )}
          </g>
        </Fragment>
      ),
    }),
  });

  return element;
};
