'use client';

import { useEffect, useRef } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '@/lib/motion/utils';

if (typeof window !== 'undefined') {
  const { gsap } = require('gsap');
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollProgressIndicatorProps {
  showPercentage?: boolean;
  className?: string;
}

export function ScrollProgressIndicator({
  showPercentage = false,
  className = '',
}: ScrollProgressIndicatorProps) {
  const progressRef = useRef<HTMLDivElement>(null);
  const percentageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (prefersReducedMotion() || !progressRef.current) return;

    const progressBar = progressRef.current;

    const scrollTrigger = ScrollTrigger.create({
      trigger: 'body',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: (self) => {
        const progress = self.progress;
        progressBar.style.width = `${progress * 100}%`;
        
        if (percentageRef.current && showPercentage) {
          percentageRef.current.textContent = `${Math.round(progress * 100)}%`;
        }
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [showPercentage]);

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 h-1 bg-transparent ${className}`}>
      <div
        ref={progressRef}
        className="h-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-500 transition-all duration-300"
        style={{ width: '0%' }}
      />
      {showPercentage && (
        <div
          ref={percentageRef}
          className="absolute top-2 right-4 text-xs font-medium text-foreground"
        />
      )}
    </div>
  );
}

