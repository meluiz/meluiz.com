'use client';

export interface SkipContentProps {
  target?: `#${string}`;
  label?: string;
}

export const SkipContent = (props: SkipContentProps) => {
  const { target = '#__APP_MAIN', label = 'Skip to content' } = props;

  const handleClick = (event: React.MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();

    const selector = target.startsWith('#') ? target : `#${target}`;
    const element = document.querySelector<HTMLElement>(selector);

    element?.focus();
    element?.scrollIntoView();
  };

  return (
    <a
      href={target}
      className="focus-visible:text-label sr-only focus-visible:not-sr-only focus-visible:absolute focus-visible:top-2 focus-visible:left-2 focus-visible:z-50 focus-visible:border focus-visible:border-foreground-accent focus-visible:bg-surface-accent focus-visible:px-2.5 focus-visible:py-1 focus-visible:font-mono focus-visible:font-medium focus-visible:text-foreground-accent focus-visible:uppercase focus-visible:outline-none"
      onClick={handleClick}
    >
      {label}
    </a>
  );
};
