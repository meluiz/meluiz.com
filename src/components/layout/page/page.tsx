import type { HTMLArkProps } from '@ark-ui/react';

import { ark, dataAttr } from '@ark-ui/react';
import cn from 'cnfast';

export type RootProps = HTMLArkProps<'div'>;

export const Root = (props: RootProps) => {
  const { className, ...rest } = props;

  return (
    <ark.div
      className={cn(
        'container block flex-1 divide-y divide-stroke-soft border-stroke-soft md:border-x',
        className,
      )}
      {...rest}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type SectionProps = HTMLArkProps<'div'> & {
  containerClass?: string;
  patterned?: boolean;
};

export const Section = (props: SectionProps) => {
  const { className, containerClass, patterned, ...rest } = props;

  return (
    <ark.section
      data-patterned={dataAttr(patterned)}
      className={cn(
        'data-patterned:pattern-diagonal relative flex flex-col data-patterned:px-6 data-patterned:sm:px-8',
        'not-data-patterned:has-[+[data-scope=separator][data-part=root]]:pb-11 sm:not-data-patterned:has-[+[data-scope=separator][data-part=root]]:pb-12',
        'not-data-patterned:[[data-scope=separator][data-part=root]+&]:pt-11 sm:not-data-patterned:[[data-scope=separator][data-part=root]+&]:pt-12',
        containerClass,
      )}
    >
      <ark.div
        className={cn(
          'flex flex-col border-stroke-soft in-data-patterned:border-x bg-surface not-in-data-patterned:px-4 not-in-data-patterned:py-8 not-in-data-patterned:sm:px-6 not-in-data-patterned:sm:py-12',
          className,
        )}
        {...rest}
      />
    </ark.section>
  );
};
