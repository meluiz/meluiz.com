'use client';

import React from 'react';

import { Button } from '@/components/ui';

const RESET_DELAY = 2000;

export interface CopyButtonProps {
  value: string;
}

export const CopyButton = (props: CopyButtonProps) => {
  const { value } = props;

  const [copied, setCopied] = React.useState(false);

  const handleClick = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
    } catch {}
  };

  React.useEffect(() => {
    if (!copied) {
      return;
    }

    const timer = window.setTimeout(() => setCopied(false), RESET_DELAY);

    return () => {
      window.clearTimeout(timer);
    };
  }, [copied]);

  return (
    <Button
      variant="outline"
      size="xsmall"
      className="shrink-0 font-mono tracking-wider uppercase"
      onClick={handleClick}
    >
      <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
    </Button>
  );
};
