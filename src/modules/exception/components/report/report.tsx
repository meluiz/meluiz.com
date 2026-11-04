import type { ReactNode } from 'react';

import { DataList, RuledGrid, Section } from '@/components/ui';

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
      <RuledGrid.Root
        className="grid-cols-2 sm:grid-cols-4"
        render={<DataList.Root className="horizontal:gap-px vertical:gap-px" />}
      >
        {entries.map((entry) => (
          <RuledGrid.Cell
            key={entry.label}
            className={entry.wide ? styles.wide : undefined}
            render={<DataList.Item />}
          >
            <DataList.Term>{entry.label}</DataList.Term>
            <DataList.Details className={styles.value}>{entry.value}</DataList.Details>
          </RuledGrid.Cell>
        ))}
      </RuledGrid.Root>
    </Section.Root>
  );
};
