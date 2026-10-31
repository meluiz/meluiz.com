import { Mascot } from '@/components/ui';

export interface StatusHeaderProps {
  status: string;
}

// The app header depends on server data (visitors, preferences), so error documents use this one
export const StatusHeader = (props: StatusHeaderProps) => {
  const { status } = props;

  return (
    <header
      id="__APP_HEADER"
      className="sticky inset-0 top-0 z-10 w-full border-b border-stroke-soft bg-surface text-foreground"
    >
      <div className="relative container border-stroke-soft px-4 sm:px-4 md:border-x">
        <div className="flex min-h-18 center-between gap-x-6">
          <a href="/" aria-label="meluiz, home" className="-ml-3 px-3">
            <Mascot size={32} blink follow />
          </a>
          <p className="inline-flex h-7 center gap-x-2 border border-stroke px-2.5 font-mono text-xs font-medium tracking-wider text-foreground-soft uppercase">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-surface-brand motion-safe:animate-pulse"
            />
            {status}
          </p>
        </div>
      </div>
    </header>
  );
};
