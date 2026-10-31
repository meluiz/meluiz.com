import type { ProjectStack } from '../../../../../../constants';

import { Tag } from '@/components/ui';

import { stacks } from './stacks.styles';

export interface StacksProps {
  name: string;
  items: ProjectStack[];
}

export const Stacks = (props: StacksProps) => {
  const { name, items } = props;

  const styles = stacks();

  if (items.length === 0) {
    return null;
  }

  return (
    <ul className={styles.root} aria-label={`Technologies used in ${name}`}>
      {items.map((stack) => (
        <Tag key={stack} render={<li />}>
          {stack}
        </Tag>
      ))}
    </ul>
  );
};
