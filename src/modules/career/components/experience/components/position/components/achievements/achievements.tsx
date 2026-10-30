import type { ExperienceAchievement } from '../../../../../../constants';

import { achievements } from './achievements.styles';

export interface AchievementsProps {
  company: string;
  items: ExperienceAchievement[];
}

export const Achievements = (props: AchievementsProps) => {
  const { company, items } = props;

  const styles = achievements();

  if (items.length === 0) {
    return null;
  }

  return (
    <ul className={styles.root} aria-label={`Highlights at ${company}`}>
      {items.map((achievement) => (
        <li key={achievement.id} className={styles.item}>
          <span className={styles.label}>
            {achievement.sector}
            {achievement.kind && (
              <>
                <span aria-hidden="true" className={styles.separator}>
                  {' · '}
                </span>
                {achievement.kind}
              </>
            )}
          </span>
          {achievement.description && (
            <p className={styles.description}>{achievement.description}</p>
          )}
        </li>
      ))}
    </ul>
  );
};
