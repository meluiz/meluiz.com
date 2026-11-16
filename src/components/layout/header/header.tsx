import Link from 'next/link';

import { Mascot } from '@/components/ui';
import { Visitors } from '@/modules/analytics';
import { getCraftList } from '@/modules/crafts/services';

import { Preferences } from '../preferences';
import { Segments } from './components';

// Resolved on the server, so the breadcrumb renders the title from the first paint
const getSegmentLabels = () => {
  return Object.fromEntries(
    getCraftList().map((craft) => [`/crafts/${craft.slug}`, craft.title]),
  );
};

export const Header = () => {
  return (
    <header
      id="__APP_HEADER"
      className="sticky inset-0 top-0 z-10 w-full border-b border-stroke-soft bg-surface text-foreground"
    >
      <div className="relative container border-stroke-soft px-4 sm:px-4 md:border-x">
        <div className="flex min-h-18 center-between gap-x-6">
          <div className="flex flex-1 center-start space-x-3 divide-x divide-stroke">
            <Link href="/" aria-label="meluiz, home" className="-ml-3 px-3">
              <Mascot size={32} blink follow />
            </Link>
            <Segments labels={getSegmentLabels()}>
              <Visitors.Content />
            </Segments>
          </div>
          <div className="flex shrink-0 stretch-center gap-x-0.5 max-sm:flex-col sm:center-end max-sm:*:[button]:flex-row-reverse max-sm:*:[button]:center-start">
            <Preferences.ThemeToggler />
            <Preferences.SoundToggler />
          </div>
        </div>
      </div>
    </header>
  );
};
