import type { Metadata } from 'next';

import { Document, Footer, Header, Scrollview, SkipContent } from '@/components/layout';
import { ColorScheme, SoundEffects } from '@/components/providers';
import { metadata as baseMetadata, manifest } from '@/constants/metadata';
import { NotFound } from '@/modules/exception';
import { getRequestInfo } from '@/modules/exception/services';

const GlobalNotFound = async () => {
  const request = await getRequestInfo();

  return (
    <Document>
      <ColorScheme.Provider>
        <SoundEffects.Provider>
          <Scrollview>
            <SkipContent target="#__APP_MAIN" />
            <Header />
            <main
              id="__APP_MAIN"
              tabIndex={-1}
              className="relative flex w-full flex-1 bg-surface text-foreground outline-hidden"
            >
              <NotFound request={request} />
            </main>
            <Footer />
          </Scrollview>
        </SoundEffects.Provider>
      </ColorScheme.Provider>
    </Document>
  );
};

export default GlobalNotFound;

/* ///////////////////////////////////////////////// */

export const metadata: Metadata = {
  ...baseMetadata,
  title: `Not found | ${manifest.short_name ?? 'meluiz'}`,
};

export { viewport } from '@/constants/metadata';
