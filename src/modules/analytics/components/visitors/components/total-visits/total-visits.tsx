import { Numeral } from '@/components/ui';

export interface TotalVisitsProps {
  visits: number | null;
}

export const TotalVisits = (props: TotalVisitsProps) => {
  const { visits } = props;

  return (
    <div className="flex flex-col items-stretch gap-x-1.5">
      {visits === null ? (
        <span aria-hidden className="font-mono text-numeral text-foreground-soft">
          ---
        </span>
      ) : (
        <Numeral value={visits} pad={3} label="visits" />
      )}
      <span
        aria-hidden
        className="text-center font-mono text-label text-foreground-soft/56 uppercase"
      >
        Visits
      </span>
    </div>
  );
};
