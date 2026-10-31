import { Section } from '@/components/ui';

import { projects } from '../../constants';
import { Project } from './components';
import { projects as projectsStyles } from './projects.styles';

export const Projects = () => {
  const styles = projectsStyles();

  return (
    <Section.Root id="projects" index={4} className={styles.root}>
      <div className={styles.panel}>
        <Section.Header divided inset="small">
          <Section.Title>
            <Section.Index />
            Things I've built
          </Section.Title>
          <Section.Description>
            Small open-source tools where I explore reusable APIs and developer experience
          </Section.Description>
        </Section.Header>
        <ul className={styles.list}>
          {projects.map((project) => (
            <li key={project.id} className={styles.item}>
              <Project project={project} />
            </li>
          ))}
          <li className={styles.item}>
            <a
              href="https://github.com/meluiz"
              rel="noreferrer noopener"
              target="_blank"
              className={styles.more}
            >
              <span className={styles.moreTitle}>Public projects</span>
              <span className={styles.moreUrl}>github.com/meluiz</span>
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          </li>
        </ul>
      </div>
    </Section.Root>
  );
};
