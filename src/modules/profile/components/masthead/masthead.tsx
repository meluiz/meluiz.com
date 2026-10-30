import Image from 'next/image';

import { masthead } from './masthead.styles';

export const Masthead = () => {
  const styles = masthead();

  return (
    <header className={styles.root}>
      <div aria-hidden="true" className={styles.banner}>
        <span className={styles.locale}>MG · BR · UTC−03</span>
      </div>
      <div className="relative flex flex-col gap-y-5 px-4 sm:px-6">
        <div className={styles.avatar}>
          <Image
            priority
            width={96}
            height={96}
            fetchPriority="high"
            src="/image/profile.png"
            alt="Portrait of Luiz Felipe in a black T-shirt against a brown background."
          />
        </div>
        <hgroup className="relative flex flex-col gap-y-2">
          <h1 id="masthead-title" className={styles.name}>
            Luiz Felipe
          </h1>
          <p className={styles.role}>
            Front-end Developer
            <span>·</span>
            Minas Gerais, Brazil
          </p>
        </hgroup>
      </div>
    </header>
  );
};
