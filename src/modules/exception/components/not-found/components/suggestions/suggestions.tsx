import type { Suggestion } from '../../../../constants';

import { IconArrowRight } from '@central-icons/outlined-sharp';

import { Panel } from '../../../panel';
import { suggestions as suggestionsStyles } from './suggestions.styles';

export interface SuggestionsProps {
  items: Suggestion[];
  title?: string;
  description?: string;
}

export const Suggestions = (props: SuggestionsProps) => {
  const {
    items,
    title = 'Try instead',
    description = 'The places people usually meant to land on',
  } = props;

  const styles = suggestionsStyles();

  if (items.length === 0) {
    return null;
  }

  return (
    <Panel id="try-instead" index={2} title={title} description={description}>
      <ol className={styles.list}>
        {items.map((item, index) => (
          <li key={item.id}>
            <a href={item.href} className={styles.link}>
              <span aria-hidden="true" className={styles.index}>
                {String(index + 1).padStart(2, '0')}
              </span>
              <span className={styles.label}>{item.label}</span>
              <span aria-hidden="true" className={styles.hint}>
                {item.hint}
              </span>
              <IconArrowRight aria-hidden="true" className={styles.icon} />
            </a>
          </li>
        ))}
      </ol>
    </Panel>
  );
};
