import type { Project as ProjectData } from '../../../../constants';

import { Links, Stacks } from './components';
import { project as projectStyles } from './project.styles';

export interface ProjectProps {
  project: ProjectData;
}

export const Project = (props: ProjectProps) => {
  const { project } = props;

  const styles = projectStyles();

  return (
    <article className={styles.root} aria-labelledby={`project-${project.id}-title`}>
      <div className={styles.header}>
        <div className={styles.heading}>
          <h3 id={`project-${project.id}-title`} className={styles.title}>
            {project.name}
          </h3>
          <Links name={project.name} links={project.links} />
        </div>
        <p className={styles.description}>{project.description}</p>
      </div>
      <Stacks name={project.name} items={project.stacks} />
    </article>
  );
};
