import { Fragment } from 'react';

import { Document, Navigation } from '@/components/layout';
import { ColorScheme, SoundEffects } from '@/components/providers';
import { ldJSON } from '@/constants/metadata';
import { Analytics } from '@/modules/analytics';

const Layout = async (props: LayoutProps<'/'>) => {
  const { children } = props;

  return (
    <Document
      trailing={
        <Fragment>
          <Analytics />
          <script
            type="application/ld+json"
            // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD has to be serialized into the document
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(ldJSON).replace(/</g, '\\u003c'),
            }}
          />
        </Fragment>
      }
    >
      <ColorScheme.Provider>
        <SoundEffects.Provider>
          {children}
          <Navigation />
        </SoundEffects.Provider>
      </ColorScheme.Provider>
    </Document>
  );
};

export default Layout;

export { metadata, viewport } from '@/constants/metadata';
