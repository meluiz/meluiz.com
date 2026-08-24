import type { HTMLArkProps } from "@ark-ui/react";

import { ark } from "@ark-ui/react";
import cn from "cnfast";

export type RootProps = HTMLArkProps<"div">;

export const Root = (props: RootProps) => {
  const { className, ...rest } = props;

  return (
    <ark.div
      className={cn(
        "container block flex-1 border-stroke-soft md:border-x divide-y divide-stroke-soft",
        className,
      )}
      {...rest}
    />
  );
};

/* ///////////////////////////////////////////////// */

export type SectionProps = HTMLArkProps<"section">;

export const Section = (props: SectionProps) => {
  const { className, ...rest } = props;

  return (
    <ark.section
      className={cn(
        "relative flex flex-col px-4 py-8 sm:px-6 sm:py-12",
        "has-[+[data-scope=separator][data-part=root]]:pb-11 sm:has-[+[data-scope=separator][data-part=root]]:pb-12",
        "[[data-scope=separator][data-part=root]+&]:pt-11 sm:[[data-scope=separator][data-part=root]+&]:pt-12",
        className,
      )}
      {...rest}
    />
  );
};
