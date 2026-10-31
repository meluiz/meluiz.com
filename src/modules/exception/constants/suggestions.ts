import { freeze } from '@/utils/helpers';

export interface Suggestion {
  id: string;
  label: string;
  hint: string;
  href: string;
}

export const suggestions = freeze<Suggestion[]>([
  {
    id: 'home',
    label: 'Home',
    hint: '/',
    href: '/',
  },
  {
    id: 'experience',
    label: 'Experience',
    hint: '/#experience',
    href: '/#experience',
  },
  {
    id: 'projects',
    label: "Things I've built",
    hint: '/#projects',
    href: '/#projects',
  },
  {
    id: 'contact',
    label: 'Get in touch',
    hint: 'me@meluiz.com',
    href: 'mailto:me@meluiz.com',
  },
]);
