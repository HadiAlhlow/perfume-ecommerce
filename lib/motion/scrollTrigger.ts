/**
 * ScrollTrigger Utilities
 * GSAP ScrollTrigger helper functions
 */

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion, getMobileDuration, getMobileParallaxSpeed } from './utils';
import { duration, easing, parallax, offset, stagger } from './tokens';

// Register ScrollTrigger plugin
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

/**
 * Create scroll-triggered animation
 */
export function createScrollAnimation(
  element: HTMLElement | string,
  options: {
    y?: number;
    opacity?: number;
    scale?: number;
    duration?: number;
    delay?: number;
    ease?: string;
    start?: string;
    end?: string;
    scrub?: boolean;
  } = {}
) {
  if (prefersReducedMotion()) return null;

  const {
    y = offset.revealUp,
    opacity = 0,
    scale = 1,
    duration: dur = duration.normal,
    delay = 0,
    ease = easing.snappy,
    start = 'top 80%',
    end = 'bottom 20%',
    scrub = false,
  } = options;

  const finalDuration = getMobileDuration(dur);

  return gsap.fromTo(
    element,
    {
      y,
      opacity,
      scale,
    },
    {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: scrub ? undefined : finalDuration / 1000,
      delay: delay / 1000,
      ease,
      scrollTrigger: {
        trigger: element,
        start,
        end,
        scrub,
        toggleActions: scrub ? undefined : 'play none none reverse',
      },
    }
  );
}

/**
 * Create parallax animation
 */
export function createParallaxAnimation(
  element: HTMLElement | string,
  speed: number = parallax.medium,
  options: {
    start?: string;
    end?: string;
    mobileSpeed?: number;
  } = {}
) {
  if (prefersReducedMotion()) return null;

  const { start = 'top bottom', end = 'bottom top', mobileSpeed } = options;
  const parallaxSpeed = mobileSpeed
    ? getMobileParallaxSpeed(mobileSpeed)
    : getMobileParallaxSpeed(speed);

  return gsap.to(element, {
    y: (i, el) => {
      const element = el as HTMLElement;
      return -(element.offsetHeight * parallaxSpeed);
    },
    ease: 'none',
    scrollTrigger: {
      trigger: element,
      start,
      end,
      scrub: true,
    },
  });
}

/**
 * Create pinned section
 */
export function createPinnedSection(
  element: HTMLElement | string,
  options: {
    pinSpacing?: boolean;
    start?: string;
    end?: string;
    duration?: string;
  } = {}
) {
  if (prefersReducedMotion()) return null;

  const {
    pinSpacing = true,
    start = 'top top',
    end = '+=200%',
    duration: dur,
  } = options;

  return ScrollTrigger.create({
    trigger: element,
    pin: true,
    pinSpacing,
    start,
    end: dur || end,
  });
}

/**
 * Create scroll progress indicator
 */
export function createScrollProgress(
  element: HTMLElement | string,
  onUpdate?: (progress: number) => void
) {
  return ScrollTrigger.create({
    trigger: 'body',
    start: 'top top',
    end: 'bottom bottom',
    scrub: true,
    onUpdate: (self) => {
      const progress = self.progress;
      if (onUpdate) {
        onUpdate(progress);
      }
      if (typeof element === 'string') {
        const el = document.querySelector(element) as HTMLElement;
        if (el) {
          el.style.width = `${progress * 100}%`;
        }
      } else {
        element.style.width = `${progress * 100}%`;
      }
    },
  });
}

/**
 * Create staggered reveal animation
 */
export function createStaggeredReveal(
  elements: HTMLElement[] | string,
  options: {
    direction?: 'up' | 'down' | 'left' | 'right';
    stagger?: number;
    duration?: number;
    start?: string;
  } = {}
) {
  if (prefersReducedMotion()) return null;

  const {
    direction = 'up',
    stagger: staggerDelay = stagger.normal,
    duration: dur = duration.normal,
    start = 'top 80%',
  } = options;

  const finalDuration = getMobileDuration(dur);
  const offsetMap = {
    up: { y: offset.revealUp, x: 0 },
    down: { y: -offset.revealUp, x: 0 },
    left: { x: offset.revealUp, y: 0 },
    right: { x: -offset.revealUp, y: 0 },
  };

  const { x, y } = offsetMap[direction];

  return gsap.fromTo(
    elements,
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
      ease: easing.snappy,
      stagger: staggerDelay,
      scrollTrigger: {
        trigger: Array.isArray(elements) ? elements[0] : elements,
        start,
        toggleActions: 'play none none reverse',
      },
    }
  );
}

/**
 * Cleanup ScrollTrigger instances
 */
export function cleanupScrollTriggers() {
  ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
}

