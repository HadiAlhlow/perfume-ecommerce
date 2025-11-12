/**
 * Performance Utilities
 * Functions for optimizing animation performance
 */

/**
 * Check if element is in viewport (lazy check)
 */
export function isInViewportLazy(
  element: HTMLElement,
  threshold: number = 0.1
): boolean {
  const rect = element.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  return (
    rect.top >= -threshold * rect.height &&
    rect.left >= -threshold * rect.width &&
    rect.bottom <= windowHeight + threshold * rect.height &&
    rect.right <= windowWidth + threshold * rect.width
  );
}

/**
 * Lazy load animation when element enters viewport
 */
export async function lazyLoadAnimation(
  element: HTMLElement,
  animationFn: () => Promise<void> | void,
  threshold: number = 0.1
): Promise<void> {
  if (isInViewportLazy(element, threshold)) {
    await animationFn();
    return;
  }

  return new Promise((resolve) => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            observer.disconnect();
            animationFn().then(() => resolve());
          }
        });
      },
      { threshold }
    );

    observer.observe(element);
  });
}

/**
 * Check if device can handle 60fps animations
 */
export function canHandle60FPS(): boolean {
  if (typeof window === 'undefined') return true;
  
  // Check for hardware acceleration support
  const canvas = document.createElement('canvas');
  const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
  
  if (!gl) return false;
  
  // Check device memory (if available)
  const deviceMemory = (navigator as any).deviceMemory;
  if (deviceMemory && deviceMemory < 4) return false;
  
  return true;
}

/**
 * Get optimal frame rate for current device
 */
export function getOptimalFrameRate(): number {
  if (canHandle60FPS()) {
    return 60;
  }
  return 30;
}

/**
 * Create GPU-accelerated transform
 */
export function createGPUTransform(
  x: number = 0,
  y: number = 0,
  z: number = 0,
  scale: number = 1
): string {
  return `translate3d(${x}px, ${y}px, ${z}px) scale(${scale})`;
}

/**
 * Measure animation performance
 */
export function measureAnimationPerformance(
  animationFn: () => void,
  duration: number = 1000
): Promise<number> {
  return new Promise((resolve) => {
    let frameCount = 0;
    const startTime = performance.now();

    function measure() {
      frameCount++;
      const currentTime = performance.now();
      
      if (currentTime - startTime < duration) {
        requestAnimationFrame(measure);
      } else {
        const fps = (frameCount / duration) * 1000;
        resolve(fps);
      }
    }

    animationFn();
    requestAnimationFrame(measure);
  });
}

