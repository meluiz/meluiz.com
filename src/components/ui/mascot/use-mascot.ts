import React from 'react';

import { useReducedMotion } from '@/hooks/sensors';

/* ///////////////////////////////////////////////// */

const REACH = 2.5;
const FALLOFF = 280;

const BLINK_DURATION = 300;
const FIRST_DELAY = 400;

const DEFAULT_INTERVAL = [2500, 6000] as const;

/* ///////////////////////////////////////////////// */

const randomBetween = (min: number, max: number) => {
  return min + Math.random() * (max - min);
};

/* ///////////////////////////////////////////////// */

export type UseMascotReturn = ReturnType<typeof useMascot>;

export interface UseMascotProps {
  blink?: boolean;
  follow?: boolean;
  interval?: readonly [min: number, max: number];
}

export const useMascot = (props: UseMascotProps = {}) => {
  const { blink: shouldBlink = false, follow = false, interval = DEFAULT_INTERVAL } = props;

  const [count, setCount] = React.useState(0);
  const rootRef = React.useRef<SVGSVGElement>(null);

  const isReducedMotion = useReducedMotion();

  const blink = () => {
    setCount((current) => current + 1);
  };

  const [min, max] = interval;

  React.useEffect(() => {
    if (!shouldBlink || isReducedMotion) {
      return;
    }

    const delay = count === 0 ? FIRST_DELAY : 0;
    const wait = delay + BLINK_DURATION + randomBetween(min, max);

    const timer = window.setTimeout(blink, wait);

    return () => {
      window.clearTimeout(timer);
    };
  }, [count, shouldBlink, isReducedMotion, min, max]);

  React.useEffect(() => {
    const element = rootRef.current;

    if (!element || !follow || isReducedMotion) {
      return;
    }

    const onPointerMove = (event: PointerEvent) => {
      const box = element.getBoundingClientRect();
      const dx = event.clientX - (box.left + box.width / 2);
      const dy = event.clientY - (box.top + box.height / 2);
      const distance = Math.hypot(dx, dy) || 1;
      const reach = Math.min(1, distance / FALLOFF) * REACH;

      element.style.setProperty('--mascot-look-x', `${((dx / distance) * reach).toFixed(2)}px`);
      element.style.setProperty('--mascot-look-y', `${((dy / distance) * reach).toFixed(2)}px`);
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });

    return () => {
      window.removeEventListener('pointermove', onPointerMove);
      element.style.removeProperty('--mascot-look-x');
      element.style.removeProperty('--mascot-look-y');
    };
  }, [follow, isReducedMotion]);

  return {
    rootRef,
    count,
    blink,
    delay: count === 0 ? FIRST_DELAY : 0,
  };
};
