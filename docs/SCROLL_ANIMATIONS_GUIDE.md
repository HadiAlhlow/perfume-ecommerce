# Scroll Animations & Motion System Guide

This guide covers the enhanced scroll animation system implemented in the application, including GSAP ScrollTrigger integration, mobile optimizations, and accessibility features.

## Overview

The scroll animation system provides:
- **GSAP ScrollTrigger** integration for advanced scroll-linked animations
- **Mobile-optimized** experiences with reduced complexity
- **Accessibility-first** design respecting `prefers-reduced-motion`
- **Performance-optimized** animations using GPU acceleration
- **Token-based** motion system for consistent animations

## Components

### Core Components

#### `GSAPScrollReveal`
GSAP-powered scroll reveal component with multiple directions and delays.

```tsx
import { GSAPScrollReveal } from "@/components/GSAPScrollReveal";

<GSAPScrollReveal direction="up" delay={100}>
  <YourContent />
</GSAPScrollReveal>
```

**Props:**
- `direction`: "up" | "down" | "left" | "right" | "fade"
- `delay`: number (milliseconds)
- `stagger`: number (milliseconds between items)
- `threshold`: number (0-1, intersection threshold)
- `triggerOnce`: boolean

#### `ScrollRevealAdvanced`
Advanced reveal animations with multiple animation types.

```tsx
import { ScrollRevealAdvanced } from "@/components/ScrollRevealAdvanced";

<ScrollRevealAdvanced animationType="scale" direction="up">
  <YourContent />
</ScrollRevealAdvanced>
```

**Animation Types:**
- `fade`: Opacity only
- `slide`: Transform with opacity
- `scale`: Scale with opacity
- `rotate`: Rotation with opacity
- `blur`: Blur filter with opacity
- `combo`: Combined transforms

#### `ScrollParallax`
Multi-layer parallax effects with mobile optimizations.

```tsx
import { ScrollParallax } from "@/components/ScrollParallax";

<ScrollParallax speed={0.5} mobileSpeed={0.25}>
  <YourContent />
</ScrollParallax>
```

#### `ScrollProgressIndicator`
Visual scroll progress indicator at the top of the page.

```tsx
import { ScrollProgressIndicator } from "@/components/ScrollProgressIndicator";

<ScrollProgressIndicator showPercentage={true} />
```

### Specialized Components

#### `ScrollTextReveal`
Kinetic typography with word/letter/line splits.

```tsx
import { ScrollTextReveal } from "@/components/ScrollTextReveal";

<ScrollTextReveal splitBy="word" direction="up">
  <h1>Your animated text</h1>
</ScrollTextReveal>
```

#### `Scroll3DEffect`
3D transforms with tilt and parallax (disabled on mobile).

```tsx
import { Scroll3DEffect } from "@/components/Scroll3DEffect";

<Scroll3DEffect intensity={15} enableTilt={true}>
  <YourContent />
</Scroll3DEffect>
```

#### `ScrollMagneticCursor`
Magnetic cursor effect for interactive elements.

```tsx
import { ScrollMagneticCursor } from "@/components/ScrollMagneticCursor";

<ScrollMagneticCursor strength={0.3} range={100}>
  <YourContent />
</ScrollMagneticCursor>
```

## Hooks

### `useGSAPScroll`
Hook for creating custom scroll-triggered animations.

```tsx
import { useGSAPScroll } from "@/hooks/useGSAPScroll";

const { isActive, progress } = useGSAPScroll({
  trigger: elementRef.current,
  start: "top 80%",
  onEnter: () => console.log("Entered viewport"),
});
```

### `useParallaxScroll`
Hook for parallax scroll effects.

```tsx
import { useParallaxScroll } from "@/hooks/useGSAPScroll";

const parallaxRef = useParallaxScroll(elementRef, 0.5, {
  mobileSpeed: 0.25,
});
```

### `useMobileScroll`
Hook for mobile scroll tracking with swipe gestures.

```tsx
import { useMobileScroll, useSwipeGesture } from "@/hooks/useMobileScroll";

const { scrollY, scrollDirection, isScrolling } = useMobileScroll({
  onScroll: (y, direction) => console.log(y, direction),
});

const { isMobile } = useSwipeGesture(
  () => console.log("Swipe left"),
  () => console.log("Swipe right")
);
```

## Motion Tokens

All animations use centralized motion tokens from `@/lib/motion/tokens`:

```tsx
import { duration, easing, parallax, offset } from "@/lib/motion/tokens";

// Durations (ms)
duration.fast      // 200ms
duration.normal    // 400ms
duration.moderate  // 500ms

// Easing
easing.standard    // cubic-bezier(0.4, 0.0, 0.2, 1)
easing.smooth      // cubic-bezier(0.4, 0.0, 0.2, 1)
easing.spring      // cubic-bezier(0.175, 0.885, 0.32, 1.275)

// Parallax speeds
parallax.light     // 0.25
parallax.medium    // 0.5
parallax.strong    // 0.75

// Offsets
offset.revealUp    // 40px
offset.md          // 40px
```

## Utilities

### ScrollTrigger Utilities

```tsx
import {
  createScrollAnimation,
  createParallaxAnimation,
  createPinnedSection,
  createScrollProgress,
  createStaggeredReveal,
} from "@/lib/motion/scrollTrigger";
```

### Performance Utilities

```tsx
import {
  isInViewportLazy,
  lazyLoadAnimation,
  canHandle60FPS,
  getOptimalFrameRate,
  createGPUTransform,
} from "@/lib/motion/performance";
```

### Mobile Optimizations

```tsx
import {
  isMobileDevice,
  getMobileDuration,
  getMobileParallaxSpeed,
  shouldDisableComplexAnimations,
  getOptimizedAnimationConfig,
} from "@/lib/motion/mobile-optimizations";
```

## Best Practices

### 1. Always Respect Reduced Motion

```tsx
import { prefersReducedMotion } from "@/lib/motion/utils";

if (prefersReducedMotion()) {
  // Disable or simplify animation
  return <SimpleVersion />;
}
```

### 2. Use Mobile Optimizations

```tsx
import { getMobileDuration, getMobileParallaxSpeed } from "@/lib/motion/mobile-optimizations";

const duration = getMobileDuration(duration.normal);
const speed = getMobileParallaxSpeed(parallax.medium);
```

### 3. GPU Acceleration

Always animate `transform` and `opacity` only for best performance:

```tsx
// ✅ Good
gsap.to(element, { x: 100, opacity: 0.5 });

// ❌ Bad
gsap.to(element, { top: 100, left: 100 });
```

### 4. Lazy Load Animations

For long pages, lazy load animations when elements enter viewport:

```tsx
import { lazyLoadAnimation } from "@/lib/motion/performance";

await lazyLoadAnimation(element, async () => {
  await setupComplexAnimation();
});
```

### 5. Cleanup ScrollTriggers

Always cleanup ScrollTrigger instances:

```tsx
useEffect(() => {
  const trigger = ScrollTrigger.create({ ... });
  
  return () => {
    trigger.kill();
  };
}, []);
```

## Mobile Considerations

1. **Reduced Parallax**: Use 50% of desktop parallax speed
2. **Shorter Durations**: Use 60% of desktop duration
3. **Disable 3D Effects**: Automatically disabled on mobile
4. **Scroll-Snap**: Use `MobileScrollSnap` for better UX
5. **Touch Optimizations**: Use passive scroll listeners

## Accessibility

1. **Reduced Motion**: All components respect `prefers-reduced-motion`
2. **Keyboard Navigation**: Animations don't interfere with keyboard
3. **Focus Indicators**: Visible during scroll animations
4. **Screen Readers**: Content available even when hidden

## Performance Targets

- **60fps** on desktop (high-end devices)
- **30fps** on mobile (acceptable)
- **LCP < 2.5s** (Largest Contentful Paint)
- **CLS < 0.1** (Cumulative Layout Shift)

## Examples

See `src/components/ScrollAnimationDemo.tsx` for comprehensive examples of all animation types.

## Troubleshooting

### Animations not working?
- Check if `prefers-reduced-motion` is enabled
- Verify GSAP ScrollTrigger is initialized
- Check browser console for errors
- Ensure element is in viewport

### Performance issues?
- Disable complex animations on mobile
- Reduce parallax speeds
- Use `will-change` CSS property sparingly
- Check FPS with `measureAnimationPerformance`

### Mobile scroll issues?
- Use `MobileScrollWrapper` for snap points
- Check viewport height calculations
- Verify touch event handlers are passive

