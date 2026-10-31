import type { ProjectLink } from '../../../../../../constants';

import { IconChainLink4, IconGithub } from '@central-icons/outlined-sharp';

import { button } from '@/components/ui';

import { links as linksStyles } from './links.styles';

export interface LinksProps {
  name: string;
  links: ProjectLink;
}

export const Links = (props: LinksProps) => {
  const { name, links } = props;

  const styles = linksStyles();
  const action = button.root({ variant: 'ghost', compact: true });

  return (
    <div className={styles.root}>
      {links.website && (
        <a
          href={links.website}
          rel="noreferrer noopener"
          target="_blank"
          className={action}
          aria-label={`${name} website (opens in a new tab)`}
        >
          <IconChainLink4 aria-hidden="true" />
        </a>
      )}

      {links.source && (
        <a
          href={links.source}
          rel="noreferrer noopener"
          target="_blank"
          className={action}
          aria-label={`${name} source code on GitHub (opens in a new tab)`}
        >
          <IconGithub aria-hidden="true" />
        </a>
      )}
    </div>
  );
};
