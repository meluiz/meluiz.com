import { Highlight } from '@/components/ui';

import { masthead } from './masthead.styles';

const formatSerialRange = (total: number) => {
  return `No. 001-${String(total).padStart(3, '0')}`;
};

export interface MastheadProps {
  total: number;
}

export const Masthead = (props: MastheadProps) => {
  const { total } = props;

  const styles = masthead();

  return (
    <header className={styles.root}>
      <div aria-hidden="true" className={styles.serial}>
        <span className={styles.serialLabel}>{formatSerialRange(total)}</span>
      </div>
      <hgroup className={styles.heading}>
        <p className={styles.eyebrow}>Crafts</p>
        <h1 id="masthead-title" className={styles.title}>
          <Highlight
            query={['small things', 'should feel']}
            text="I build small things to learn how interfaces should feel."
          />
        </h1>
      </hgroup>
    </header>
  );
};
