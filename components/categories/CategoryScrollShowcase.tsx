'use client';

import { useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { prefersReducedMotion } from '@/lib/motion/utils';

interface CategoryConfig {
  name: string;
  slug: string;
  description: string;
  notes: string[];
  video: string;
  accent: string;
}

export function CategoryScrollShowcase() {
  const categories = useMemo<CategoryConfig[]>(
    () => [
      {
        name: 'Floral',
        slug: 'floral',
        description: 'Romantic bouquets with rose, peony, and jasmine accords.',
        notes: ['Rose', 'Peony', 'Magnolia'],
        video: '/videos/floral-video.mp4',
        accent: 'from-rose-100/10 to-rose-500/10',
      },
      {
        name: 'Woody',
        slug: 'woody',
        description: 'Warm sandalwood layers wrapped in smoky cedar.',
        notes: ['Cedar', 'Oud', 'Patchouli'],
        video: '/videos/wood-video.mp4',
        accent: 'from-amber-100/10 to-amber-500/10',
      },
      {
        name: 'Fresh',
        slug: 'fresh',
        description: 'Marine breeze meets crisp botanicals and citrus zest.',
        notes: ['Bergamot', 'Marine Mist', 'Green Tea'],
        video: '/videos/fresh-video.mp4',
        accent: 'from-sky-100/10 to-emerald-500/10',
      },
      {
        name: 'Oriental',
        slug: 'oriental',
        description: 'Exotic spices and amber resins with gourmand warmth.',
        notes: ['Saffron', 'Vanilla', 'Amber'],
        video: '/videos/oriental-video.mp4',
        accent: 'from-orange-100/10 to-orange-500/10',
      },
      {
        name: 'Citrus',
        slug: 'citrus',
        description: 'Sparkling citrus peel with effervescent energy.',
        notes: ['Grapefruit', 'Yuzu', 'Neroli'],
        video: '/videos/citrus-video.mp4',
        accent: 'from-yellow-100/10 to-yellow-500/10',
      },
    ],
    []
  );

  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleHoverStart = (index: number) => {
    setActiveIndex(index);
    const video = videoRefs.current[index];
    if (video) {
      video.currentTime = 0;
      video.loop = true;
      video
        .play()
        .catch(() => {
          // Autoplay may fail depending on browser policies.
        });
    }
  };

  const handleHoverEnd = (index: number) => {
    // Pause all videos to ensure clean state
    videoRefs.current.forEach((video) => {
      if (video) {
        video.pause();
        video.currentTime = 0;
      }
    });
    // Collapse all cards when hover ends
    setActiveIndex(null);
  };

  const getCardStyle = (index: number) => {
    const reduceMotion = prefersReducedMotion();
    const isActive = index === activeIndex;
    if (reduceMotion) {
      return {
        flexGrow: 1,
        flexBasis: '20%',
        transform: 'none',
      };
    }
    const rotation = isActive ? -2 : -5;
    return {
      flexGrow: isActive ? 1.8 : 1,
      flexBasis: isActive ? '28%' : '18%',
      transform: `perspective(1600px) rotateY(${rotation}deg)`,
      transformOrigin: 'center left',
      willChange: 'flex, transform',
    };
  };

  return (
    <div
      className="relative w-full"
      aria-label="Explore perfume categories through immersive cards"
    >
      <div className="relative h-[80vh] md:h-[90vh] rounded-[32px] bg-gradient-to-b from-charcoal/40 via-black/60 to-black shadow-2xl overflow-hidden">
        <div className="absolute inset-0 flex gap-3 md:gap-4 px-2 md:px-4 py-6">
          {categories.map((category, index) => {
            const isActive = index === activeIndex;
            return (
              <Link
                key={category.slug}
                href={`/categories/${category.slug}`}
                onMouseEnter={() => handleHoverStart(index)}
                onMouseLeave={() => handleHoverEnd(index)}
                onFocus={() => handleHoverStart(index)}
                onBlur={() => handleHoverEnd(index)}
                onTouchStart={() => handleHoverStart(index)}
                onTouchEnd={() => handleHoverEnd(index)}
                className={`group relative flex flex-col overflow-hidden rounded-[28px] border border-white/10 transition-all duration-500 transform-gpu`}
                style={{
                  ...getCardStyle(index),
                  transitionTimingFunction: 'var(--ease-snappy)',
                }}
              >
                <div className="absolute inset-0">
                  <video
                    ref={(el) => {
                      videoRefs.current[index] = el;
                    }}
                    src={category.video}
                    muted
                    playsInline
                    preload="metadata"
                    className={`h-full w-full object-cover transition-opacity duration-500 ${
                      isActive ? 'opacity-100' : 'opacity-60'
                    }`}
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-b ${category.accent} via-black/60 to-black/80`}
                    aria-hidden="true"
                  />
                </div>
                <div className="relative z-10 h-full text-white">
                  <div
                    className={`absolute inset-0 flex flex-col justify-between p-6 md:p-8 transition-opacity duration-300 ${
                      isActive ? 'opacity-100' : 'opacity-0 pointer-events-none'
                    }`}
                  >
                    <div className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-white/70">
                      <span className="block h-px w-6 bg-white/40" />
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </div>
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-3xl md:text-4xl font-semibold leading-tight">
                          {category.name}
                        </h3>
                        <p className="mt-3 text-base md:text-lg text-white/80">
                          {category.description}
                        </p>
                      </div>
                      <div className="flex flex-wrap gap-2 text-xs font-semibold tracking-wide">
                        {category.notes.map((note) => (
                          <span
                            key={note}
                            className="rounded-full border border-white/30 bg-white/10 px-3 py-1 backdrop-blur"
                          >
                            {note}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm font-medium uppercase tracking-[0.2em]">
                      <span>Discover</span>
                      <svg
                        className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-2"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </div>
                  </div>

                  <div
                    className={`absolute inset-0 flex flex-col items-center justify-center text-center transition-opacity duration-300 ${
                      isActive ? 'opacity-0 pointer-events-none' : 'opacity-100'
                    }`}
                  >
                    <div className="flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-white/70">
                      <span className="block h-px w-6 bg-white/40" />
                      {index + 1 < 10 ? `0${index + 1}` : index + 1}
                    </div>
                    <h3 className="mt-4 text-3xl font-semibold tracking-[0.2em]">
                      {category.name}
                    </h3>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

