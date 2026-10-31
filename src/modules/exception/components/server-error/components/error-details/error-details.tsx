import type { StackFrame } from './error-details.utils';

import { Panel } from '../../../panel';
import { CopyButton } from './components';
import { errorDetails } from './error-details.styles';
import { parseStack } from './error-details.utils';

/* ///////////////////////////////////////////////// */

const SHOW_STACK = process.env.NODE_ENV === 'development';

/* ///////////////////////////////////////////////// */

const toLocation = (frame: StackFrame) => {
  return [frame.file, frame.line, frame.column].filter((part) => part !== null).join(':');
};

/* ///////////////////////////////////////////////// */

export interface ErrorDetailsProps {
  error: Error & { digest?: string };
}

export const ErrorDetails = (props: ErrorDetailsProps) => {
  const { error } = props;

  const styles = errorDetails();

  const frames = SHOW_STACK ? parseStack(error.stack) : [];
  const highlighted = frames.findIndex((frame) => !frame.internal);

  // The stack already starts with `name: message`, so it replaces the summary when shown
  const report = [
    SHOW_STACK && error.stack ? error.stack : `${error.name}: ${error.message}`,
    error.digest && `Digest: ${error.digest}`,
  ]
    .filter(Boolean)
    .join('\n');

  return (
    <Panel
      id="error-details"
      index={2}
      title="Error details"
      description="For whoever is debugging this — probably me"
      action={<CopyButton value={report} />}
    >
      <p className={styles.summary}>
        <span className={styles.name}>{error.name}</span>{' '}
        <span className={styles.message}>{error.message}</span>
      </p>
      {frames.length > 0 && (
        <ol className={styles.frames}>
          {frames.map((frame, index) => (
            <li
              key={index}
              data-internal={frame.internal || undefined}
              data-highlighted={index === highlighted || undefined}
              className={styles.frame}
            >
              <span className={styles.index}>{index + 1}</span>
              <span className={styles.at}>at</span>
              <span className={styles.function}>{frame.name}</span>
              <span className={styles.location}>{toLocation(frame)}</span>
            </li>
          ))}
        </ol>
      )}
    </Panel>
  );
};
