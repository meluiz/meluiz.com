import { DataList, RuledGrid, Section } from '@/components/ui';

import { colophon } from '../../constants';
import { colophon as colophonStyles } from './colophon.styles';
import { Reference } from './components';

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
        <RuledGrid.Root
          layout="specs"
          render={<DataList.Root className="horizontal:gap-px vertical:gap-px" />}
        >
          {colophon.specs.map((spec) => (
            <RuledGrid.Cell key={spec.label} render={<DataList.Item />}>
              <DataList.Term>{spec.label}</DataList.Term>
              <DataList.Details>
                <Reference label={spec.value} href={spec.href} />
              </DataList.Details>
            </RuledGrid.Cell>
          ))}
        </RuledGrid.Root>
        <RuledGrid.Root
          layout="cards"
          render={<DataList.Root className="horizontal:gap-px vertical:gap-px" />}
        >
          <RuledGrid.Cell render={<DataList.Item />}>
            <DataList.Term>Stack</DataList.Term>
            <DataList.Details>
              <ul className={styles.list}>
                {colophon.stacks.map((stack) => (
                  <li key={stack}>{stack}</li>
                ))}
              </ul>
            </DataList.Details>
          </RuledGrid.Cell>
          <RuledGrid.Cell render={<DataList.Item />}>
            <DataList.Term>Analytics</DataList.Term>
            <DataList.Details>
              <ul className={styles.list}>
                {colophon.analytics.map((service) => (
                  <li key={service.label}>
                    <Reference label={service.label} href={service.href} />
                  </li>
                ))}
              </ul>
            </DataList.Details>
          </RuledGrid.Cell>
        </RuledGrid.Root>
        <RuledGrid.Root
          layout="cards"
          render={<DataList.Root className="horizontal:gap-px vertical:gap-px" />}
        >
          <RuledGrid.Cell stretch render={<DataList.Item />}>
            <DataList.Term>Inspired by</DataList.Term>
            <DataList.Details>
              <ol className={styles.inspirations}>
                {colophon.inspirations.map((inspiration) => (
                  <li key={inspiration.label}>
                    <Reference label={inspiration.label} href={inspiration.href} />
                  </li>
                ))}
              </ol>
            </DataList.Details>
          </RuledGrid.Cell>
        </RuledGrid.Root>
      </div>
    </Section.Root>
  );
};
