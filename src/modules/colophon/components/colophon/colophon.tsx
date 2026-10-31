import { RuledGrid, Section } from '@/components/ui';

import { colophon } from '../../constants';
import { colophon as colophonStyles } from './colophon.styles';
import { Entry, Reference } from './components';

export const Colophon = () => {
  const styles = colophonStyles();

  return (
    <Section.Root id="colophon">
      <Section.Header divided inset="small" className={styles.header}>
        <Section.Title className={styles.title}>meluiz.com</Section.Title>
        <Section.Description>
          Relishing the details. Fostering innovation. Achieving excellence.
        </Section.Description>
      </Section.Header>
      <div className={styles.body}>
        <RuledGrid.Root layout="specs" render={<dl />}>
          {colophon.specs.map((spec) => (
            <Entry key={spec.label} label={spec.label}>
              <Reference label={spec.value} href={spec.href} />
            </Entry>
          ))}
        </RuledGrid.Root>
        <RuledGrid.Root layout="cards" render={<dl />}>
          <Entry label="Stack">
            <ul className={styles.list}>
              {colophon.stacks.map((stack) => (
                <li key={stack}>{stack}</li>
              ))}
            </ul>
          </Entry>
          <Entry label="Analytics">
            <ul className={styles.list}>
              {colophon.analytics.map((service) => (
                <li key={service.label}>
                  <Reference label={service.label} href={service.href} />
                </li>
              ))}
            </ul>
          </Entry>
        </RuledGrid.Root>
        <RuledGrid.Root layout="cards" render={<dl />}>
          <Entry label="Inspired by" stretch>
            <ol className={styles.inspirations}>
              {colophon.inspirations.map((inspiration) => (
                <li key={inspiration.label}>
                  <Reference label={inspiration.label} href={inspiration.href} />
                </li>
              ))}
            </ol>
          </Entry>
        </RuledGrid.Root>
      </div>
    </Section.Root>
  );
};
