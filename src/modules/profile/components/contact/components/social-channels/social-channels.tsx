import type { SocialChannel } from '../../../../constants';

import { socialChannels } from './social-channels.styles';

export interface SocialChannelsProps {
  items: SocialChannel[];
}

export const SocialChannels = (props: SocialChannelsProps) => {
  const { items } = props;

  const styles = socialChannels();

  if (items.length === 0) {
    return null;
  }

  return (
    <ul className={styles.root} aria-label="Social channels">
      {items.map((channel) => (
        <li key={channel.id} className={styles.item}>
          <a
            href={channel.href}
            rel="noreferrer noopener"
            target="_blank"
            className={styles.link}
          >
            <span className={styles.name}>{channel.name}</span>
            <span className={styles.handle}>
              {channel.handle}
              <span className="sr-only"> (opens in a new tab)</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
};
