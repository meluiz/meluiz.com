import type { HTMLArkProps } from '@ark-ui/react';

import { ark } from '@ark-ui/react';
import { idle } from 'blobatar/expression';
import { Blobatar } from 'blobatar/react';
import cn from 'cnfast';

import { Separator as $Separator } from '@/components/ui';

export type RootProps = HTMLArkProps<'div'>;

export const Root = (props: RootProps) => {
  const { className, ...rest } = props;

  return (
    <ark.div
      className={cn('container block flex-1 border-stroke-soft md:border-x', className)}
      {...rest}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type SectionProps = HTMLArkProps<'section'>;

export const Section = (props: SectionProps) => {
  const { className, ...rest } = props;

  return (
    <ark.section
      className={cn(
        'relative flex flex-col px-4 py-14 sm:px-6 sm:py-16',
        'has-[+[data-scope=separator][data-part=root]]:pb-11 sm:has-[+[data-scope=separator][data-part=root]]:pb-12',
        '[[data-scope=separator][data-part=root]+&]:pt-11 sm:[[data-scope=separator][data-part=root]+&]:pt-12',
        className,
      )}
      {...rest}
    />
  );
};

/* ///////////////////////////////////////////////// */

export const Separator = () => {
  return (
    <$Separator.Root className="center relative my-3 flex sm:my-4" lighten aria-hidden="true">
      <span className="center absolute flex size-10 rounded-full bg-surface *:[img]:size-4 *:[svg]:size-6 sm:*:[svg]:size-8">
        <Blobatar
          name="meluiz"
          title="meluiz"
          animate="always"
          expression={idle}
          className="[--eye-color:var(--color-surface)] [--head-color:var(--color-stroke)] dark:[--head-color:var(--color-stroke-soft)]"
          palette={{
            eye: 'var(--eye-color)',
            head: 'var(--head-color)',
          }}
        />
      </span>
    </$Separator.Root>
  );
};
