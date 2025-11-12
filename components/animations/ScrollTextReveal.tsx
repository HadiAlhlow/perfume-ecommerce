'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion, getMobileDuration } from '@/lib/motion/utils';
import { duration, easing, offset, stagger } from '@/lib/motion/tokens';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollTextRevealProps {
  children: ReactNode;
  splitBy?: 'word' | 'letter' | 'line';
  direction?: 'up' | 'down' | 'left' | 'right';
  delay?: number;
  className?: string;
}

export function ScrollTextReveal({
  children,
  splitBy = 'word',
  direction = 'up',
  delay = 0,
  className = '',
}: ScrollTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !containerRef.current) return;

    const element = containerRef.current;
    const textContent = element.textContent || '';
    
    // Don't process empty text
    if (!textContent.trim()) return;
    
    // Split text based on splitBy prop
    let textElements: string[] = [];
    if (splitBy === 'word') {
      textElements = textContent.split(/\s+/).filter(t => t.length > 0);
    } else if (splitBy === 'letter') {
      textElements = textContent.split('').filter(t => t.trim().length > 0 || t === ' ');
    } else if (splitBy === 'line') {
      textElements = textContent.split('\n').filter(t => t.length > 0);
    }

    // Don't process if no elements
    if (textElements.length === 0) return;

    // Clear and rebuild with spans
    element.innerHTML = '';
    const spans: HTMLSpanElement[] = [];

    textElements.forEach((text, index) => {
      const span = document.createElement('span');
      span.style.display = splitBy === 'letter' ? 'inline-block' : 'inline';
      span.style.opacity = '0';
      span.textContent = text + (splitBy === 'word' ? ' ' : '');
      element.appendChild(span);
      spans.push(span);
    });

    const offsetMap = {
      up: { y: offset.revealUp, x: 0 },
      down: { y: -offset.revealUp, x: 0 },
      left: { x: offset.revealUp, y: 0 },
      right: { x: -offset.revealUp, y: 0 },
    };

    const { x, y } = offsetMap[direction];
    const finalDuration = getMobileDuration(duration.normal);

    const animation = gsap.fromTo(
      spans,
      {
        x,
        y,
        opacity: 0,
      },
      {
        x: 0,
        y: 0,
        opacity: 1,
        duration: finalDuration / 1000,
        delay: delay / 1000,
        ease: easing.snappy,
        stagger: stagger.normal,
        scrollTrigger: {
          trigger: element,
          start: 'top 80%',
          toggleActions: 'play none none reverse',
        },
      }
    );

    return () => {
      animation?.kill();
      ScrollTrigger.getAll().forEach((trigger) => {
        if (trigger.vars.trigger === element) {
          trigger.kill();
        }
      });
    };
  }, [splitBy, direction, delay]);

  return (
    <div ref={containerRef} className={className}>
      {children}
    </div>
  );
}

