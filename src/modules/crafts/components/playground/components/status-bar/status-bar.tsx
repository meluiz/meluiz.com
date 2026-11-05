import React from 'react';

import { parts } from '../../playground.anatomy';
import { usePlaygroundContext } from '../../use-playground-context';
import * as styles from './status-bar.styles';

export interface StatusBarProps {
  hint?: string;
}

export const StatusBar = (props: StatusBarProps) => {
  const { hint } = props;

  const { status } = usePlaygroundContext();

  const value = React.useSyncExternalStore(status.subscribe, status.get, status.get);

  return (
    <div {...parts.status_bar.attrs} className={styles.root()}>
      <span {...parts.status.attrs} className={styles.status()} aria-live="polite">
        {value}
      </span>
      {hint && (
        <span {...parts.hint.attrs} className={styles.hint()}>
          {hint}
        </span>
      )}
    </div>
  );
};
