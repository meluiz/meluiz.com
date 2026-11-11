import { cn, cva } from "@/utils/styles";

export const root = cva({
  base: "relative grid grid-cols-[auto_1fr_auto] items-baseline border border-stroke bg-surface-soft px-3.5 py-3",
  variants: {},
});

export const indicator = cva({
  base: cn([
    "col-start-1 brackets me-2 font-mono text-label text-foreground-soft uppercase brackets-foreground-soft",
    "has-[svg]:before:content-none has-[svg]:after:content-none *:[svg]:h-lh *:[svg]:w-4",
  ]),
  defaultVariants: {
    tone: "plain",
  },
  variants: {
    tone: {
      plain: "",
      accent: "text-foreground-accent",
    },
  },
});

export const content = cva({
  base: "col-start-2 flex min-w-0 flex-col gap-y-0.5",
  variants: {},
});

export const title = cva({
  base: "text-body-strong text-foreground",
  variants: {},
});

export const description = cva({
  base: "text-body text-foreground-prose",
  variants: {},
});

export const action = cva({
  base: "col-start-2 mt-2 justify-self-start sm:col-start-3 sm:row-start-1 sm:ms-3 sm:mt-0 sm:self-center",
  variants: {},
});
