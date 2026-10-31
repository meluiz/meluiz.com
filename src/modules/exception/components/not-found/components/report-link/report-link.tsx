'use client';

import type { RequestInfo } from '../../../../services';

import { usePathname } from 'next/navigation';

import { Button } from '@/components/ui';

const EMAIL = 'me@meluiz.com';

export interface ReportLinkProps {
  request: RequestInfo;
}

export const ReportLink = (props: ReportLinkProps) => {
  const { request } = props;

  const pathname = usePathname();

  const subject = `Broken link: ${pathname}`;
  const body = [
    `Path: ${pathname}`,
    `Referrer: ${request.referrer ?? 'direct'}`,
    `Timestamp: ${request.timestamp.iso}`,
    `Request ID: ${request.id ?? '-'}`,
  ].join('\n');

  const href = `mailto:${EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

  return (
    <Button variant="outline" size="large" native={false} render={<a href={href} />}>
      Report broken link
    </Button>
  );
};
