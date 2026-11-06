import { Fragment } from 'react';

import { Document, JsonLd, Navigation } from '@/components/layout';
import { ColorScheme, SoundEffects } from '@/components/providers';
import { siteGraph } from '@/constants/metadata';
import { Analytics } from '@/modules/analytics';

const Layout = async (props: LayoutProps<'/'>) => {
  const { children } = props;

  return (
    <Document
      trailing={
        <Fragment>
          <Analytics />
          <JsonLd data={siteGraph} />
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
