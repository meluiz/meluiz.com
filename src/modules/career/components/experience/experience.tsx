import { Section, Timeline } from '@/components/ui';

import { positions } from '../../constants';
import { Position } from './components';

export const Experience = () => {
  return (
    <Section.Root id="experience" index={3}>
      <Section.Header divided inset="medium">
        <Section.Title>
          <Section.Index />
          Experience
        </Section.Title>
        <Section.Description indent>
          Where I've worked and the sites and apps I helped ship in health, media and Web3. Most
          of them can't be linked anymore, so each one says why.
        </Section.Description>
      </Section.Header>
      <Timeline.Root>
        {positions.map((position) => (
          <Position key={position.id} position={position} />
        ))}
      </Timeline.Root>
    </Section.Root>
  );
};
