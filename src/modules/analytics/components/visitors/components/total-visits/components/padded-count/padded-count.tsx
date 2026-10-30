export interface PaddedCountProps {
  value: number | null;
  length?: number;
}

export const PaddedCount = (props: PaddedCountProps) => {
  const { value, length = 3 } = props;

  if (value === null) {
    return (
      <span
        aria-hidden
        className="font-mono text-2xl leading-none font-medium text-foreground-soft"
      >
        {'-'.repeat(length)}
      </span>
    );
  }

  const raw = String(value);

  const padded = raw.padStart(length, '0');
  const zeros = padded.length - raw.length;

  return (
    <span className="font-mono text-2xl leading-none font-medium">
      <span aria-hidden className="text-foreground-soft">
        {padded.slice(0, zeros)}
      </span>
      <span aria-hidden className="text-foreground">
        {padded.slice(zeros)}
      </span>
    </span>
  );
};
