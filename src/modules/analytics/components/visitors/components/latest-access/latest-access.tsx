import type React from 'react';

export interface LatestAccessProps {
  date?: React.ReactNode;
  country?: string;
}

export const LatestAccess = (props: LatestAccessProps) => {
  const { country = '-', date = '-' } = props;

  return (
    <dl
      aria-hidden
      className="flex flex-col gap-y-0.5 font-mono text-value uppercase max-sm:hidden"
    >
      <div className="flex items-center">
        <dt className="inline-block w-13 text-foreground-soft">Last</dt>
        <dd className="text-foreground">{date}</dd>
      </div>
      <div className="flex items-center">
        <dt className="inline-block w-13 text-foreground-soft">From</dt>
        <dd className="text-foreground">{country}</dd>
      </div>
    </dl>
  );
};
