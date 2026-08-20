'use client';

import React from 'react';

export type ErrorBoundaryProps = {
  retry: () => void;
  error: Error & { digest?: string };
};

const ErrorBoundary = (props: ErrorBoundaryProps) => {
  const { error } = props;

  React.useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="center relative flex flex-1">
      <div className="flex max-w-md flex-col items-start gap-y-4 px-4 sm:px-6">
        <h1 className="bg-surface-inverse px-2 py-1 text-left font-bold font-mono text-4xl text-foreground-inverse sm:text-5xl">
          500
        </h1>
        <div className="flex flex-col items-start gap-y-1">
          <p className="text-left font-medium font-mono text-foreground text-lg">
            Something went wrong.
          </p>
          <p className="text-left font-mono text-foreground-soft text-sm">
            An unexpected error occurred while loading this page.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorBoundary;
