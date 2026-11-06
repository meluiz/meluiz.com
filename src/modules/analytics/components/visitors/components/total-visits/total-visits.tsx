import { PaddedCount } from './components';

export interface TotalVisitsProps {
  visits: number | null;
}

export const TotalVisits = (props: TotalVisitsProps) => {
  const { visits } = props;

  return (
    <div className="flex flex-col items-stretch gap-x-1.5">
      <PaddedCount value={visits} length={3} />
      <span
        aria-hidden
        className="text-center font-mono text-label text-foreground-soft/56 uppercase"
      >
        Visits
      </span>
    </div>
  );
};
