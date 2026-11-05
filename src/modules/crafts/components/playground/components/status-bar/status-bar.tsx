import { parts } from '../../playground.anatomy';
import { usePlaygroundContext } from '../../use-playground-context';
import * as styles from './status-bar.styles';

export interface StatusBarProps {
  hint?: string;
}

export const StatusBar = (props: StatusBarProps) => {
  const { hint } = props;

  const { setStatusBarRef } = usePlaygroundContext();

  return (
    <div {...parts.status_bar.attrs} className={styles.root()}>
      <span
        ref={setStatusBarRef}
        {...parts.status.attrs}
        className={styles.status()}
        aria-live="polite"
      />
      {hint && (
        <span {...parts.hint.attrs} className={styles.hint()}>
          {hint}
        </span>
      )}
    </div>
  );
};
