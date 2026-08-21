'use client';

import { Portal } from '@ark-ui/react';
import { createListCollection } from '@ark-ui/react/select';
import { AnimatePresence, MotionConfig, motion } from 'motion/react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Fragment, useRef } from 'react';

import { Button, Separator } from '@/components/ui';
import { useSoundContext } from '@/providers/application';

import { type Panel, type PanelItem, TRANSITION, type UseDockProps, useDock } from './use-dock';

/* ///////////////////////////////////////////////// */

export type PositionerProps = React.PropsWithChildren;

export const Positioner = (props: PositionerProps) => {
  const { children } = props;
  return (
    <Portal>
      <div className="center pointer-events-none fixed inset-x-0 bottom-0 z-20 flex pb-4">
        {children}
      </div>
    </Portal>
  );
};

/* ///////////////////////////////////////////////// */

export type ContentProps = Omit<UseDockProps, 'toolbarRef'> & {
  'aria-label'?: string;
};

export const Content = (props: ContentProps) => {
  const { collection, 'aria-label': ariaLabel = 'Navigation' } = props;

  const toolbarRef = useRef<HTMLElement>(null);
  const { panel, state, navigate, isReduced, onKeyDown, getAnimationMotion } = useDock({
    collection,
    toolbarRef,
  });

  if (!panel) {
    throw new Error(`Unknown panel. Try one of: ${collection.getValues().join(', ')}`);
  }

  return (
    <MotionConfig transition={TRANSITION}>
      <motion.nav
        ref={toolbarRef}
        layout={!isReduced}
        role="toolbar"
        aria-label={ariaLabel}
        aria-orientation="horizontal"
        onKeyDown={onKeyDown}
        className="center pointer-events-auto relative flex min-h-fit overflow-hidden rounded-sm border border-stroke-soft bg-surface px-1.5 py-1"
      >
        <AnimatePresence initial={false} mode="popLayout">
          <motion.div
            key={panel.value}
            className="flex items-center gap-x-0.5"
            {...getAnimationMotion(state.direction)}
          >
            {panel.groups.map((group, groupIndex) => {
              const isLastGroup = groupIndex === panel.groups.length - 1;

              return (
                <Fragment key={`dock:${panel.value}:${group.name}`}>
                  {group.items.map((item, itemIndex) => {
                    const isFirstControl = groupIndex === 0 && itemIndex === 0;

                    return (
                      <Item
                        key={`dock:${group.name}:${item.type}:${item.label}`}
                        item={item}
                        tabIndex={isFirstControl ? 0 : -1}
                        onNavigate={({ to }) => navigate(to)}
                      />
                    );
                  })}
                  {!isLastGroup ? (
                    <Separator.Root
                      orientation="vertical"
                      aria-hidden="true"
                      className="mx-1 h-4.5"
                    />
                  ) : null}
                </Fragment>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </motion.nav>
    </MotionConfig>
  );
};

type NavigateDetails = {
  item: PanelItem;
  to: string;
};

type ItemProps = {
  item: PanelItem;
  tabIndex: 0 | -1;
  onNavigate: (details: NavigateDetails) => void;
};

const Item = (props: ItemProps) => {
  const { item, tabIndex, onNavigate } = props;
  const { play } = useSoundContext();
  const pathname = usePathname();

  if (item.type === 'trigger') {
    return (
      <Button.Root
        variant="ghost"
        compact
        data-dock-control
        tabIndex={tabIndex}
        aria-label={item.label}
        onClick={() => onNavigate({ item, to: item.to })}
      >
        <item.icon aria-hidden="true" />
      </Button.Root>
    );
  }

  const isExternal = item.href.startsWith('http');
  const isCurrent = pathname === item.href;

  return (
    <Button.Root type={undefined} variant={isCurrent ? 'soft' : 'ghost'} compact asChild>
      <Link
        href={item.href as any}
        tabIndex={tabIndex}
        aria-label={item.label}
        aria-current={isCurrent ? 'page' : undefined}
        target={isExternal ? '_blank' : undefined}
        rel={isExternal ? 'noopener noreferrer' : undefined}
        onNavigate={() => {
          if (!isCurrent) {
            play('tick');
          }
        }}
      >
        <item.icon aria-hidden="true" />
      </Link>
    </Button.Root>
  );
};

/* ///////////////////////////////////////////////// */

export const defineDockCollection = <const Value extends string>(items: Panel<Value>[]) => {
  return createListCollection<Panel>({ items });
};
