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
}

export const NotFound = (props: NotFoundProps) => {
  const { request } = props;

  const styles = notFound();

  const location = [request.state, request.country].filter((value) => value !== null);
  const region = [request.edge, request.country].filter((value) => value !== null).join(' · ');

  return (
    <div className={styles.root}>
      <div className={styles.intro}>
        <Masthead
          code="404"
          mood="idle"
          title="Page not found"
          tags={['Not found', ...location]}
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
              <Button variant="solid" size="large" native={false} render={<Link href="/" />}>
                <IconArrowLeft aria-hidden="true" />
                Back home
              </Button>
              <ReportLink request={request} />
            </Fragment>
          }
        >
          Nothing lives at <Pathname />. The page may have moved, been renamed, or never existed
          — the link that brought you here might just be older than the site.
        </Overview>
      </div>
      <Suggestions items={suggestions} />
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
