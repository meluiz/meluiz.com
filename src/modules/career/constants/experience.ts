import { freeze } from '@/utils/helpers';

export type ExperienceStack =
  | 'TypeScript'
  | 'JavaScript'
  | 'PHP'
  | 'React'
  | 'React Native'
  | 'React Hooks'
  | 'Next.js'
  | 'Vue.js'
  | 'Laravel'
  | 'Redux'
  | 'Context API'
  | 'GraphQL'
  | 'Tailwind CSS'
  | 'Cypress'
  | 'TDD';

export interface ExperiencePosition {
  id: string;
  role: string;
  company: string;
  startDate: string;
  endDate?: string;
  summary: string;
  stacks: ExperienceStack[];
  achievements: ExperienceAchievement[];
}

export interface ExperienceAchievement {
  id: string;
  kind?: string;
  sector: string;
  status?: string;
  description?: string;
}

export const positions = freeze<ExperiencePosition[]>([
  {
    id: 'grupo-plan-front-end',
    role: 'Front-end Developer',
    company: 'Grupo Plan Marketing',
    startDate: '2026-02',
    summary:
      'Building and maintaining web and mobile apps for Pincéis Atlas, a Brazilian paint-tools manufacturer, with a focus on performance, code organization and scale.',
    stacks: ['TypeScript', 'React', 'React Native', 'Next.js', 'Vue.js', 'Laravel', 'Redux'],
    achievements: [
      {
        id: 'atlas-apps',
        sector: 'Manufacturing',
        kind: 'Web & mobile apps',
      },
    ],
  },
  {
    id: 'refine-studio-front-end',
    role: 'Front-end Developer',
    company: 'Refine Studio',
    startDate: '2024-12',
    endDate: '2025-09',
    summary:
      'Improved Web3 services, working across the front end and the back end to make them sturdier, more accessible and easier to scale.',
    stacks: ['TypeScript', 'React', 'React Native', 'Next.js', 'Tailwind CSS', 'Context API'],
    achievements: [
      {
        id: 'refine-web3',
        sector: 'Web3',
        kind: 'Website',
      },
    ],
  },
  {
    id: 'rbr-digital-mobile',
    role: 'Mobile Developer',
    company: 'RBR Digital',
    startDate: '2024-01',
    endDate: '2024-10',
    summary:
      'Built the mobile app for GoldCare Health & Wellness, a health and wellness platform, alongside the web front-end work at RBR Digital.',
    achievements: [
      {
        id: 'rbr-goldcare',
        sector: 'Health',
        kind: 'Mobile app',
      },
    ],
    stacks: [
      'TypeScript',
      'JavaScript',
      'React',
      'React Native',
      'Next.js',
      'GraphQL',
      'Context API',
      'Cypress',
      'TDD',
    ],
  },
  {
    id: 'rbr-digital-front-end',
    role: 'Front-end Developer',
    company: 'RBR Digital',
    startDate: '2021-10',
    endDate: '2024-10',
    summary:
      'Built web front-ends for news and health platforms, delivering accessible content on current events.',
    achievements: [
      {
        id: 'rbr-media-health-platforms',
        sector: 'Media & Health',
        kind: 'Website',
      },
    ],
    stacks: [
      'TypeScript',
      'JavaScript',
      'React',
      'React Native',
      'Next.js',
      'GraphQL',
      'Context API',
      'Cypress',
      'TDD',
    ],
  },
  {
    id: 'meluiz-freelance',
    role: 'Freelance Front-end Developer',
    company: 'meluiz',
    startDate: '2020-02',
    endDate: '2021-10',
    summary:
      'Built and maintained front-end services and apps for small projects and businesses while consolidating modern development practices.',
    achievements: [
      {
        id: 'freelance-general',
        sector: 'Small business',
        kind: 'Website',
      },
    ],
    stacks: [
      'TypeScript',
      'JavaScript',
      'React',
      'React Hooks',
      'Context API',
      'PHP',
      'Laravel',
    ],
  },
]);
