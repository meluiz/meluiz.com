import { useId } from 'react';

export type UseSectionReturn = ReturnType<typeof useSection>;

export interface UseSectionProps {
  id?: string;
  index?: number;
}

export const useSection = (props: UseSectionProps = {}) => {
  const generatedId = useId();

  const id = props.id ?? `section-${generatedId}`;
  const index = props.index === undefined ? undefined : String(props.index).padStart(2, '0');

  return {
    id,
    index,
    titleId: `${id}-title`,
    descriptionId: `${id}-description`,
  };
};
