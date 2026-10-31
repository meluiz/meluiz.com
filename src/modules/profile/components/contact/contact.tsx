import { IconArrowRight } from '@central-icons/outlined-sharp';

import { Section } from '@/components/ui';

import { socialChannels } from '../../constants';
import { SocialChannels } from './components';
import { contact } from './contact.styles';

export const Contact = () => {
  const styles = contact();

  return (
    <Section.Root id="contact" index={5} tone="brand" className={styles.root}>
      <Section.Header className={styles.header}>
        <hgroup className={styles.heading}>
          <p className={styles.eyebrow}>
            <Section.Index /> <span aria-hidden="true">·</span> Contact
          </p>
          <Section.Title size="large" className={styles.title}>
            Working on something that needs care in the details?
          </Section.Title>
          <Section.Description className={styles.description}>
            I'm open to front-end projects and conversations about interfaces. Email is the best
            way to reach me.
          </Section.Description>
        </hgroup>
        <a href="mailto:me@meluiz.com" className={styles.email}>
          me@meluiz.com
          <IconArrowRight aria-hidden="true" className={styles.emailIcon} />
        </a>
      </Section.Header>
      <SocialChannels items={socialChannels} />
    </Section.Root>
  );
};
