import type { ReactNode } from 'react';

import { Section } from '@/components/ui';

import { overview } from './overview.styles';

export interface OverviewProps {
  children: ReactNode;
  actions?: ReactNode;
  note?: ReactNode;
}

export const Overview = (props: OverviewProps) => {
  const { children, actions, note } = props;

  const styles = overview();

  return (
    <div className={styles.root}>
      <Section.Root id="what-happened" index={1} className={styles.section}>
        <Section.Title>
          <Section.Index />
          What happened
        </Section.Title>
        <Section.Body indent>
          <p className={styles.text}>{children}</p>
          {actions && <div className={styles.actions}>{actions}</div>}
          {note && <p className={styles.note}>{note}</p>}
        </Section.Body>
      </Section.Root>
    </div>
  );
};
