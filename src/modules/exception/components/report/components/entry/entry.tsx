import type { ReactNode } from 'react';

import { RuledGrid } from '@/components/ui';

import { entry } from './entry.styles';

export interface EntryProps {
  label: string;
  className?: string;
  children: ReactNode;
}

export const Entry = (props: EntryProps) => {
  const { label, className, children } = props;

  const styles = entry();

  return (
    <RuledGrid.Cell className={className}>
      <dt className={styles.label}>{label}</dt>
      <dd className={styles.value}>{children}</dd>
    </RuledGrid.Cell>
  );
};
