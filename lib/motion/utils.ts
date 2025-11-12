/**
 * Motion Utilities
 * Helper functions for motion and animations
 */

/**
 * Check if user prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get motion-safe duration (reduced if user prefers reduced motion)
 */
export function getMotionDuration(baseDuration: number): number {
  if (prefersReducedMotion()) {
    return 0;
  }
  return baseDuration;
}

/**
 * Check if device is mobile
 */
export function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return window.innerWidth < 768;
}

/**
 * Get mobile-optimized duration (60% of desktop)
 */
export function getMobileDuration(desktopDuration: number): number {
  if (isMobileDevice()) {
    return desktopDuration * 0.6;
  }
  return desktopDuration;
}

/**
 * Get mobile-optimized parallax speed (50% of desktop)
 */
export function getMobileParallaxSpeed(desktopSpeed: number): number {
  if (isMobileDevice()) {
    return desktopSpeed * 0.5;
  }
  return desktopSpeed;
}

/**
 * Create GPU-accelerated transform
 */
export function createGPUTransform(
  x: number = 0,
  y: number = 0,
  z: number = 0,
  scale: number = 1,
  rotateX: number = 0,
  rotateY: number = 0,
  rotateZ: number = 0
): string {
  return `translate3d(${x}px, ${y}px, ${z}px) scale(${scale}) rotateX(${rotateX}deg) rotateY(${rotateY}deg) rotateZ(${rotateZ}deg)`;
}

