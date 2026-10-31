import type { ReactNode } from 'react';

import { Section } from '@/components/ui';

import { panel } from './panel.styles';

export interface PanelProps {
  id: string;
  index: number;
  title: string;
  description?: string;
  action?: ReactNode;
  children: ReactNode;
}

export const Panel = (props: PanelProps) => {
  const { id, index, title, description, action, children } = props;

  const styles = panel();

  return (
    <Section.Root id={id} index={index} className={styles.root}>
      <div className={styles.panel}>
        <Section.Header divided inset="small" className={styles.header}>
          <div className={styles.heading}>
            <Section.Title>
              <Section.Index />
              {title}
            </Section.Title>
            {description && <Section.Description>{description}</Section.Description>}
          </div>
          {action}
        </Section.Header>
        {children}
      </div>
    </Section.Root>
  );
};
