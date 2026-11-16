import { DataList, Numeral, RuledGrid } from '@/components/ui';

import { stats } from './stats.styles';

const EMPTY_VALUE = '—';

export interface StatsProps {
  total: number;
  since: string | null;
  latest: string | null;
}

export const Stats = (props: StatsProps) => {
  const { total, since, latest } = props;

  const styles = stats();

  return (
    <RuledGrid.Root className={styles.root} render={<DataList.Root className={styles.list} />}>
      <RuledGrid.Cell className={styles.item} render={<DataList.Item />}>
        <DataList.Term translate="no">Crafts</DataList.Term>
        <DataList.Details>
          <Numeral value={total} pad={2} label="crafts" className="text-value" />
        </DataList.Details>
      </RuledGrid.Cell>
      <RuledGrid.Cell className={styles.item} render={<DataList.Item />}>
        <DataList.Term>Since</DataList.Term>
        <DataList.Details>{since ?? EMPTY_VALUE}</DataList.Details>
      </RuledGrid.Cell>
      <RuledGrid.Cell className={styles.item} render={<DataList.Item />}>
        <DataList.Term>Latest</DataList.Term>
        <DataList.Details>{latest ?? EMPTY_VALUE}</DataList.Details>
      </RuledGrid.Cell>
    </RuledGrid.Root>
  );
};
