'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion, getMobileDuration } from '@/lib/motion/utils';
import { duration, easing, offset, stagger } from '@/lib/motion/tokens';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface GSAPScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'down' | 'left' | 'right' | 'fade';
  delay?: number;
  stagger?: number;
  threshold?: number;
  triggerOnce?: boolean;
  className?: string;
}

export function GSAPScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  stagger: staggerDelay = 0,
  threshold = 0.1,
  triggerOnce = false,
  className = '',
}: GSAPScrollRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return;
    if (triggerOnce && hasAnimated.current) return;

    const element = containerRef.current;
    const children = element.children;

    const offsetMap = {
      up: { y: offset.revealUp, x: 0 },
      down: { y: -offset.revealUp, x: 0 },
      left: { x: offset.revealUp, y: 0 },
      right: { x: -offset.revealUp, y: 0 },
      fade: { y: 0, x: 0 },
    };

    const { x, y } = offsetMap[direction];
    const finalDuration = getMobileDuration(duration.normal);

    const animation = gsap.fromTo(
      children.length > 0 ? Array.from(children) : element,
      {
        x,
        y,
        opacity: direction === 'fade' ? 0 : 0.3,
      },
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: finalDuration / 1000,
        delay: delay / 1000,
        ease: easing.snappy,
        stagger: children.length > 0 ? staggerDelay / 1000 : 0,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          end: 'bottom 20%',
          toggleActions: triggerOnce ? 'play none none none' : 'play none none reverse',
          once: triggerOnce,
        },
      }
    );

    if (triggerOnce) {
      hasAnimated.current = true;
    }

    return () => {
      animation?.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [direction, delay, staggerDelay, threshold, triggerOnce]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

