import type { ExperiencePosition } from '../../../../constants';

import { DateTime } from 'luxon';

import { Timeline } from '@/components/ui';

import { Achievements, Stacks } from './components';
import { position as positionStyles } from './position.styles';

/* ///////////////////////////////////////////////// */

const formatMonth = (isoMonth: string) => {
  const date = DateTime.fromISO(isoMonth, { zone: 'utc', locale: 'en-US' });

  if (!date.isValid) {
    throw new Error(`Invalid ISO month: "${isoMonth}" (${date.invalidReason})`);
  }

  return date.startOf('month').toFormat('LLL yyyy');
};

/* ///////////////////////////////////////////////// */

export interface PositionProps {
  position: ExperiencePosition;
}

export const Position = (props: PositionProps) => {
  const { position } = props;

  const styles = positionStyles();

  return (
    <Timeline.Item>
      <Timeline.Aside>
        <span className={styles.period}>
          <time dateTime={position.startDate}>{formatMonth(position.startDate)}</time>
          {' — '}
          {position.endDate ? (
            <time dateTime={position.endDate}>{formatMonth(position.endDate)}</time>
          ) : (
            'now'
          )}
        </span>

        {!position.endDate && <span className={styles.current}>Current</span>}
      </Timeline.Aside>
      <Timeline.Content className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>
            {position.role} <span>at</span> {position.company}
          </h3>
          <p className={styles.summary}>{position.summary}</p>
        </div>

        <Achievements company={position.company} items={position.achievements} />
        <Stacks company={position.company} items={position.stacks} />
      </Timeline.Content>
    </Timeline.Item>
  );
};
