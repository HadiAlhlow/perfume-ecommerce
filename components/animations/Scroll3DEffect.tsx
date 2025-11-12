'use client';

import { useEffect, useRef, ReactNode } from 'react';
import { gsap } from 'gsap';
import { shouldDisableComplexAnimations } from '@/lib/motion/mobile-optimizations';
import { prefersReducedMotion } from '@/lib/motion/utils';
import { duration, easing } from '@/lib/motion/tokens';

interface Scroll3DEffectProps {
  children: ReactNode;
  intensity?: number;
  enableTilt?: boolean;
  className?: string;
}

export function Scroll3DEffect({
  children,
  intensity = 15,
  enableTilt = true,
  className = '',
}: Scroll3DEffectProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (
      prefersReducedMotion() ||
      shouldDisableComplexAnimations() ||
      !containerRef.current ||
      !enableTilt
    ) {
      return;
    }

    const element = containerRef.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -intensity;
      const rotateY = ((x - centerX) / centerX) * intensity;

      gsap.to(element, {
        rotateX: gsap.utils.clamp(-intensity, intensity, rotateX),
        rotateY: gsap.utils.clamp(-intensity, intensity, rotateY),
        duration: duration.normal / 1000,
        ease: easing.smooth,
      });
    };

    const handleMouseLeave = () => {
      gsap.to(element, {
        rotateX: 0,
        rotateY: 0,
        duration: duration.normal / 1000,
        ease: easing.smooth,
      });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity, enableTilt]);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
    >
      {children}
    </div>
  );
}

