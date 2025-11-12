'use client';

import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion, getMobileParallaxSpeed } from '@/lib/motion/utils';
import { parallax } from '@/lib/motion/tokens';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface UseParallaxScrollOptions {
  speed?: number;
  mobileSpeed?: number;
  start?: string;
  end?: string;
}

export function useParallaxScroll(
  elementRef: React.RefObject<HTMLElement>,
  speed: number = parallax.medium,
  options: UseParallaxScrollOptions = {}
) {
  const { mobileSpeed, start = 'top bottom', end = 'bottom top' } = options;
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !elementRef.current) return;

    const element = elementRef.current;
    const parallaxSpeed = mobileSpeed
      ? getMobileParallaxSpeed(mobileSpeed)
      : getMobileParallaxSpeed(speed);

    const animation = gsap.to(element, {
      y: -(element.offsetHeight * parallaxSpeed),
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub: true,
      },
    });

    animationRef.current = animation;

    return () => {
      animation?.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [elementRef, speed, mobileSpeed, start, end]);

  return animationRef;
}

