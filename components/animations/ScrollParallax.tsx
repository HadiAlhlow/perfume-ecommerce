'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion, getMobileParallaxSpeed } from '@/lib/motion/utils';
import { parallax } from '@/lib/motion/tokens';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollParallaxProps {
  children: ReactNode;
  speed?: number;
  mobileSpeed?: number;
  className?: string;
}

export function ScrollParallax({
  children,
  speed = parallax.medium,
  mobileSpeed,
  className = '',
}: ScrollParallaxProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return;

    const element = containerRef.current;
    const parallaxSpeed = mobileSpeed
      ? getMobileParallaxSpeed(mobileSpeed)
      : getMobileParallaxSpeed(speed);

    const animation = gsap.to(element, {
      y: (i, el) => {
        const element = el as HTMLElement;
        return -(element.offsetHeight * parallaxSpeed);
      },
      ease: 'none',
      scrollTrigger: {
        trigger: element,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      animation?.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [speed, mobileSpeed]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

