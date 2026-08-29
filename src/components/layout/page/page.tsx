import type { HTMLArkProps } from '@ark-ui/react';

import { ark, dataAttr } from '@ark-ui/react';
import cn from 'cnfast';

import { splitAriaAttribute, splitDataAttribute } from '@/utils/helpers';

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
  tighten?: boolean;
  patterned?: boolean;
};

export const Section = (props: SectionProps) => {
  const { className, containerClass, tighten, patterned, ...rest } = props;

  const [ariaProps, nonAriaProps] = splitAriaAttribute(rest);
  const [dataProps, contentProps] = splitDataAttribute(nonAriaProps);

  return (
    <ark.section
      {...ariaProps}
      {...dataProps}
      data-tighten={dataAttr(tighten)}
      data-patterned={dataAttr(patterned)}
      className={cn(
        'data-patterned:pattern-diagonal relative flex flex-col data-patterned:px-6 data-patterned:sm:px-8',
        'not-data-patterned:not-has-tighten:has-[+[data-scope=separator][data-part=root]]:pb-11 sm:not-data-patterned:not-has-tighten:has-[+[data-scope=separator][data-part=root]]:pb-12',
        'not-data-patterned:not-has-tighten:[[data-scope=separator][data-part=root]+&]:pt-11 sm:not-data-patterned:not-has-tighten:[[data-scope=separator][data-part=root]+&]:pt-12',
        containerClass,
      )}
    >
      <ark.div
        {...contentProps}
        className={cn(
          'not-in-data-patterned:not-in-data-tightenpx-4 flex flex-col border-stroke-soft in-data-patterned:border-x bg-surface not-in-data-patterned:not-in-data-tighten:py-8 not-in-data-patterned:not-in-data-tighten:sm:px-6 not-in-data-patterned:not-in-data-tighten:sm:py-12',
          className,
        )}
      />
    </ark.section>
  );
};
