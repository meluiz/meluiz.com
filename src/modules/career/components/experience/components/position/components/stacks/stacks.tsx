import type { ExperienceStack } from '../../../../../../constants';

import { Tag } from '@/components/ui';

import { stacks } from './stacks.styles';

export interface StacksProps {
  company: string;
  items: ExperienceStack[];
}

export const Stacks = (props: StacksProps) => {
  const { company, items } = props;

  const styles = stacks();

  if (items.length === 0) {
    return null;
  }

  return (
    <ul className={styles.root} aria-label={`Technologies used at ${company}`}>
      {items.map((stack) => (
        <Tag key={stack} render={<li />}>
          {stack}
        </Tag>
      ))}
    </ul>
  );
};
