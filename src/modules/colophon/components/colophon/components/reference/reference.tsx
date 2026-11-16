import { Button } from '@/components/ui';

export interface ReferenceProps {
  label: string;
  href?: string;
}

export const Reference = (props: ReferenceProps) => {
  const { label, href } = props;

  if (!href) {
    return label;
  }

  return (
    <Button
      variant="link"
      native={false}
      render={<a href={href} rel="noreferrer noopener" target="_blank" />}
    >
      {/* Links point at names (people, products, a commit), so only the hint is translated */}
      <span translate="no">{label}</span>
      <span className="sr-only"> (opens in a new tab)</span>
    </Button>
  );
};
