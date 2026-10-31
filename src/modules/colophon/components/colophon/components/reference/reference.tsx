import { button } from '@/components/ui';

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
    <a
      href={href}
      rel="noreferrer noopener"
      target="_blank"
      className={button.root({ variant: 'link' })}
    >
      {label}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  );
};
