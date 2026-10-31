'use client';

// Imported by path: the layout barrel also exports a server-only component (Header)
import { Document } from '@/components/layout/document';
import { Frame } from '@/components/layout/frame';
import { ServerError, StatusHeader } from '@/modules/exception';

interface GlobalErrorProps {
  error: unknown;
  retry: () => void;
}

const GlobalError = (props: GlobalErrorProps) => {
  const { error, retry } = props;

  return (
    <Document>
      <title>Something went wrong | meluiz</title>
      <Frame header={<StatusHeader status="Degraded" />}>
        <ServerError error={error} retry={retry} />
      </Frame>
    </Document>
  );
};

export default GlobalError;
