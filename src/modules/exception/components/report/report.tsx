import type { ReactNode } from 'react';

import { RuledGrid, Section } from '@/components/ui';

import { Entry } from './components';
import { report } from './report.styles';

export interface ReportEntry {
  label: string;
  value: ReactNode;
  wide?: boolean;
}

export interface ReportProps {
  id: string;
  title: string;
  description: string;
  entries: ReportEntry[];
}

export const Report = (props: ReportProps) => {
  const { id, title, description, entries } = props;

  const styles = report();

  return (
    <Section.Root id={id}>
      <Section.Header divided inset="small" className={styles.header}>
        <Section.Title className={styles.title}>{title}</Section.Title>
        <Section.Description>{description}</Section.Description>
      </Section.Header>
      <RuledGrid.Root layout="specs" render={<dl />}>
        {entries.map((entry) => (
          <Entry
            key={entry.label}
            label={entry.label}
            className={entry.wide ? styles.wide : undefined}
          >
            {entry.value}
          </Entry>
        ))}
      </RuledGrid.Root>
    </Section.Root>
  );
};
