import type { Metadata } from 'next';

import { Document, Frame, Header } from '@/components/layout';
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
          <Frame header={<Header />}>
            <NotFound request={request} />
          </Frame>
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
