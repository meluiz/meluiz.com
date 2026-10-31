'use client';

// Imported by path: the layout barrel also exports a server-only component (Header)
import { Document } from '@/components/layout/document';
import { Footer } from '@/components/layout/footer';
import { Scrollview } from '@/components/layout/scrollview';
import { SkipContent } from '@/components/layout/skip-content';
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
      <Scrollview>
        <SkipContent target="#__APP_MAIN" />
        <StatusHeader status="Degraded" />
        <main
          id="__APP_MAIN"
          tabIndex={-1}
          className="relative flex w-full flex-1 bg-surface text-foreground outline-hidden"
        >
          <ServerError error={error} retry={retry} />
        </main>
        <Footer />
      </Scrollview>
    </Document>
  );
};

export default GlobalError;
