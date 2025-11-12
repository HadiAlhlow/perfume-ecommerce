/**
 * Mobile Optimizations
 * Utilities for optimizing animations on mobile devices
 */

import { isMobileDevice } from './utils';
import { duration, parallax } from './tokens';

/**
 * Check if complex animations should be disabled
 */
export function shouldDisableComplexAnimations(): boolean {
  return isMobileDevice();
}

/**
 * Get optimized animation configuration for current device
 */
export function getOptimizedAnimationConfig() {
  const isMobile = isMobileDevice();
  
  return {
    duration: isMobile ? duration.normal * 0.6 : duration.normal,
    parallaxSpeed: isMobile ? parallax.medium * 0.5 : parallax.medium,
    enable3D: !isMobile,
    enableParallax: true, // Parallax is enabled but reduced on mobile
    staggerDelay: isMobile ? 0.03 : 0.06,
  };
}

/**
 * Get mobile-optimized duration
 */
export function getMobileDuration(desktopDuration: number): number {
  if (isMobileDevice()) {
    return desktopDuration * 0.6;
  }
  return desktopDuration;
}

/**
 * Get mobile-optimized parallax speed
 */
export function getMobileParallaxSpeed(desktopSpeed: number): number {
  if (isMobileDevice()) {
    return desktopSpeed * 0.5;
  }
  return desktopSpeed;
}

