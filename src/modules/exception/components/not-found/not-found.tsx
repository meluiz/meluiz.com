import type { ReactNode } from 'react';
import type { Suggestion } from '../../constants';
import type { RequestInfo } from '../../services';

import { IconArrowLeft } from '@central-icons/outlined-sharp';
import Link from 'next/link';
import { Fragment } from 'react';

import { Button } from '@/components/ui';

import { suggestions } from '../../constants';
import { Masthead } from '../masthead';
import { Overview } from '../overview';
import { Report } from '../report';
import { Pathname, ReportLink, Suggestions } from './components';
import { notFound } from './not-found.styles';

export interface NotFoundProps {
  request: RequestInfo;
  /** Heading shown under the 404 banner. */
  title?: string;
  /** Extra tags shown in the banner, before the request location. */
  tags?: string[];
  /** Body of the "What happened" section. */
  description?: ReactNode;
  /** Primary action, rendered before the report link. */
  action?: ReactNode;
  suggestions?: {
    items: Suggestion[];
    title?: string;
    description?: string;
  };
}

export const NotFound = (props: NotFoundProps) => {
  const {
    request,
    title = 'Page not found',
    tags = [],
    description = (
      <Fragment>
        Nothing lives at <Pathname />. The page may have moved, been renamed, or never existed —
        the link that brought you here might just be older than the site.
      </Fragment>
    ),
    action = (
      <Button variant="solid" size="large" native={false} render={<Link href="/" />}>
        <IconArrowLeft aria-hidden="true" />
        Back home
      </Button>
    ),
    suggestions: suggestionsProps = { items: suggestions },
  } = props;

  const styles = notFound();

  const location = [request.state, request.country].filter((value) => value !== null);
  const region = [request.edge, request.country].filter((value) => value !== null).join(' · ');

  return (
    <div className={styles.root}>
      <div className={styles.intro}>
        <Masthead
          code="404"
          mood="idle"
          title={title}
          tags={['Not found', ...tags, ...location]}
          details={[
            `HTTP ${request.status.code}`,
            <span key="path">
              {request.method} <Pathname />
            </span>,
          ]}
        />
        <Overview
          actions={
            <Fragment>
              {action}
              <ReportLink request={request} />
            </Fragment>
          }
        >
          {description}
        </Overview>
      </div>
      <Suggestions {...suggestionsProps} />
      <Report
        id="request"
        title="Request"
        description="What the server saw, in case you report it."
        entries={[
          {
            label: 'Status',
            value: (
              <Fragment>
                <mark>{request.status.code}</mark> {request.status.text}
              </Fragment>
            ),
          },
          {
            label: 'Method',
            value: request.method,
          },
          {
            label: 'Path',
            value: <Pathname />,
            wide: true,
          },
          {
            label: 'Referrer',
            value: request.referrer ?? 'direct',
          },
          {
            label: 'Region',
            value: region || 'local',
          },
          {
            label: 'Timestamp',
            value: <time dateTime={request.timestamp.iso}>{request.timestamp.label}</time>,
          },
          {
            label: 'Request ID',
            value: <span title={request.id ?? undefined}>{request.id ?? '-'}</span>,
          },
        ]}
      />
    </div>
  );
};
