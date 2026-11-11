import { mergeProps, useRender } from '@base-ui/react';
import { Fragment } from 'react';

import { parts } from './numeral.anatomy';
import * as styles from './numeral.styles';

/* ///////////////////////////////////////////////// */

const decimal = new Intl.NumberFormat('en-US', {
  useGrouping: false,
  maximumFractionDigits: 100,
});

const toSegments = (value: number, pad: number, label?: string) => {
  if (Number.isNaN(value)) {
    return {
      sign: '',
      zeros: '',
      digits: '—',
      text: 'no value',
    };
  }

  const sign = value < 0 ? '-' : '';
  const digits = Number.isFinite(value) ? decimal.format(Math.abs(value)) : '∞';

  const [integer] = digits.split('.');
  const zeros = Number.isFinite(value) ? '0'.repeat(Math.max(0, pad - integer.length)) : '';

  const amount = Number.isFinite(value) ? `${sign}${digits}` : `${sign}infinity`;

  return {
    sign,
    zeros,
    digits,
    text: label ? `${amount} ${label}` : amount,
  };
};

/* ///////////////////////////////////////////////// */

export type NumeralBaseProps = {
  value: number;
  pad?: number;
  label?: string;
};

export type NumeralProps = Omit<useRender.ComponentProps<'span'>, 'children'> &
  NumeralBaseProps;

export const Numeral = (props: NumeralProps) => {
  const { className, label, pad = 0, render, value, ...rest } = props;

  const { sign, zeros, digits, text } = toSegments(value, pad, label);

  const numeralProps = {
    role: 'img',
    'aria-label': text,
  };

  return useRender({
    defaultTagName: 'span',
    render,
    props: mergeProps(parts.root.attrs, numeralProps, rest, {
      className: styles.root({ className }),
      children: (
        <Fragment>
          {sign}
          {zeros && (
            <span {...parts.pad.attrs} className={styles.pad()}>
              {zeros}
            </span>
          )}
          <span {...parts.value.attrs}>{digits}</span>
        </Fragment>
      ),
    }),
  });
};
