'use client';

import { IconArrowRotateClockwise } from '@central-icons/outlined-sharp';
import { env } from 'envin/env';
import { DateTime } from 'luxon';
import { Fragment } from 'react';

import { Button } from '@/components/ui';

import { Masthead } from '../masthead';
import { Overview } from '../overview';
import { Report } from '../report';
import { ErrorDetails } from './components';
import { serverError } from './server-error.styles';

/* ///////////////////////////////////////////////// */

const SHORT_SHA_LENGTH = 7;
const EMAIL = 'me@meluiz.com';

/* ///////////////////////////////////////////////// */

// Values thrown in Client Components may not be `Error` instances
const toError = (value: unknown): Error & { digest?: string } => {
  return value instanceof Error ? value : new Error(String(value));
};

/* ///////////////////////////////////////////////// */

export interface ServerErrorProps {
  error: unknown;
  retry: () => void;
}

export const ServerError = (props: ServerErrorProps) => {
  const { retry } = props;

  const styles = serverError();

  const error = toError(props.error);
  const now = DateTime.now();

  const build = env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA?.slice(0, SHORT_SHA_LENGTH) ?? 'dev';

  return (
    <div className={styles.root}>
      <div className={styles.intro}>
        <Masthead
          code="500"
          mood="broken"
          title="Something went wrong"
          tags={['Unhandled', 'Global']}
          details={[
            'Unexpected error',
            error.digest && (
              <span key="digest">
                Digest <code>{error.digest}</code>
              </span>
            ),
          ].filter(Boolean)}
        />
        <Overview
          actions={
            <Fragment>
              <Button variant="solid" size="large" onClick={() => retry()}>
                <IconArrowRotateClockwise aria-hidden="true" />
                Try again
              </Button>
              <Button variant="outline" size="large" native={false} render={<a href="/" />}>
                Go home
              </Button>
            </Fragment>
          }
          note={
            <Fragment>
              Still broken? Email <a href={`mailto:${EMAIL}`}>{EMAIL}</a> with the digest above.
            </Fragment>
          }
        >
          The site hit an error it couldn't recover from, so the whole page stopped loading.
          It's <mark>not something you did</mark> — the error was logged, and trying again
          usually fixes it.
        </Overview>
      </div>
      <ErrorDetails error={error} />
      <Report
        id="incident"
        title="Incident"
        description="Include this when you report it."
        entries={[
          {
            label: 'Status',
            value: (
              <Fragment>
                <mark>500</mark> Internal
              </Fragment>
            ),
          },
          {
            label: 'Boundary',
            value: 'global-error',
          },
          {
            label: 'Digest',
            value: error.digest ?? '-',
            wide: true,
          },
          {
            label: 'Runtime',
            value: error.digest ? 'nodejs' : 'browser',
          },
          {
            label: 'Region',
            value: '-',
          },
          {
            label: 'Timestamp',
            value: (
              <time dateTime={now.toISO() ?? undefined} suppressHydrationWarning>
                {now.toFormat('yyyy-MM-dd HH:mm')}
              </time>
            ),
          },
          {
            label: 'Build',
            value: build,
          },
        ]}
      />
    </div>
  );
};
