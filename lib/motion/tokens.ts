/**
 * Motion Tokens
 * Centralized motion configuration following design principles
 */

export const duration = {
  fast: 120, // Micro interactions
  normal: 200, // Base duration
  moderate: 280, // Large moves
  slow: 360, // Very large moves
} as const;

export const easing = {
  standard: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  smooth: 'cubic-bezier(0.4, 0.0, 0.2, 1)',
  snappy: 'cubic-bezier(0.16, 1, 0.3, 1)',
  spring: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
  decel: 'cubic-bezier(0.2, 0, 0, 1)',
} as const;

export const parallax = {
  light: 0.25,
  medium: 0.5,
  strong: 0.75,
} as const;

export const offset = {
  revealUp: 40,
  md: 40,
  lg: 80,
} as const;

export const stagger = {
  fast: 0.04,
  normal: 0.06,
  slow: 0.08,
} as const;

export type Duration = typeof duration[keyof typeof duration];
export type Easing = typeof easing[keyof typeof easing];
export type ParallaxSpeed = typeof parallax[keyof typeof parallax];

