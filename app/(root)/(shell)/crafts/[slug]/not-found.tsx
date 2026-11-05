import type { Metadata } from 'next';

import { IconArrowLeft } from '@central-icons/outlined-sharp';
import Link from 'next/link';

import { Button } from '@/components/ui';
import { getCraftList } from '@/modules/crafts/services';
import { NotFound as NotFoundView, Pathname } from '@/modules/exception';
import { getRequestInfo } from '@/modules/exception/services';

const SUGGESTION_LIMIT = 5;

const NotFound = async () => {
  const request = await getRequestInfo();

  const crafts = getCraftList().slice(0, SUGGESTION_LIMIT);

  return (
    <NotFoundView
      request={request}
      title="Craft not found"
      tags={['Craft']}
      description={
        <>
          There's no craft at <Pathname />. It may have been renamed, unpublished, or is still
          on the workbench — the full collection is a click away.
        </>
      }
      action={
        <Button variant="solid" size="large" native={false} render={<Link href="/crafts" />}>
          <IconArrowLeft aria-hidden="true" />
          Back to crafts
        </Button>
      }
      suggestions={{
        title: 'Latest crafts',
        description: 'Fresh off the workbench',
        items: crafts.map((craft) => ({
          id: craft.slug,
          label: craft.title,
          hint: `/crafts/${craft.slug}`,
          href: `/crafts/${craft.slug}`,
        })),
      }}
    />
  );
};

export default NotFound;

/* ///////////////////////////////////////////////// */

export const metadata: Metadata = {
  title: 'Craft not found',
};
