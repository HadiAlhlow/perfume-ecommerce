'use client';

import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '@/lib/motion/utils';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseGSAPScrollOptions {
  trigger?: HTMLElement | null;
  start?: string;
  end?: string;
  onEnter?: () => void;
  onLeave?: () => void;
  onEnterBack?: () => void;
  onLeaveBack?: () => void;
}

export function useGSAPScroll(options: UseGSAPScrollOptions = {}) {
  const {
    trigger,
    start = 'top 80%',
    end = 'bottom 20%',
    onEnter,
    onLeave,
    onEnterBack,
    onLeaveBack,
  } = options;

  const [isActive, setIsActive] = useState(false);
  const [progress, setProgress] = useState(0);
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !trigger) return;

    const scrollTrigger = ScrollTrigger.create({
      trigger,
      start,
      end,
      onEnter: () => {
        setIsActive(true);
        onEnter?.();
      },
      onLeave: () => {
        setIsActive(false);
        onLeave?.();
      },
      onEnterBack: () => {
        setIsActive(true);
        onEnterBack?.();
      },
      onLeaveBack: () => {
        setIsActive(false);
        onLeaveBack?.();
      },
      onUpdate: (self) => {
        setProgress(self.progress);
      },
    });

    scrollTriggerRef.current = scrollTrigger;

    return () => {
      scrollTrigger.kill();
    };
  }, [trigger, start, end, onEnter, onLeave, onEnterBack, onLeaveBack]);

  return { isActive, progress };
}

