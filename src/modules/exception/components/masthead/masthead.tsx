import type { ReactNode } from 'react';
import type { MascotMood } from '@/components/ui';

import { Fragment } from 'react';

import { Mascot } from '@/components/ui';

import { masthead } from './masthead.styles';

export interface MastheadProps {
  code: string;
  mood?: MascotMood;
  title: string;
  tags?: string[];
  details?: ReactNode[];
}

export const Masthead = (props: MastheadProps) => {
  const { code, mood = 'idle', title, tags = [], details = [] } = props;

  const styles = masthead();
  const middle = Math.floor(code.length / 2);

  return (
    <header className={styles.root}>
      <div aria-hidden="true" className={styles.banner}>
        <p className={styles.code}>
          <span>{code.slice(0, middle)}</span>
          <Mascot mood={mood} blink animated className={styles.mascot} />
          <span>{code.slice(middle + 1)}</span>
        </p>
        <div className={styles.meta}>
          <span>ERR · {code}</span>
          {tags.length > 0 && <span>{tags.join(' · ')}</span>}
        </div>
      </div>
      <hgroup className={styles.heading}>
        <h1 className={styles.title}>{title}</h1>
        {details.length > 0 && (
          <p className={styles.details}>
            {details.map((detail, index) => (
              <Fragment key={index}>
                {index > 0 && <span aria-hidden="true"> · </span>}
                {detail}
              </Fragment>
            ))}
          </p>
        )}
      </hgroup>
    </header>
  );
};
