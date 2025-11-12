'use client';

import { useRef, useEffect } from 'react';
import { gsap } from 'gsap';

interface HeroContentProps {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  onCtaClick?: () => void;
  className?: string;
}

export function HeroContent({
  title = 'Discover Your Signature Scent',
  subtitle = 'Explore our curated collection of luxury perfumes',
  ctaText = 'Shop Now',
  onCtaClick,
  className = '',
}: HeroContentProps) {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (titleRef.current) {
      const words = title.split(' ');
      titleRef.current.innerHTML = words
        .map((word) => `<span class="inline-block">${word}</span>`)
        .join(' ');

      const spans = titleRef.current.querySelectorAll('span');
      gsap.from(spans, {
        y: 60,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        stagger: 0.1,
      });
    }

    if (subtitleRef.current) {
      gsap.from(subtitleRef.current, {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 0.4,
      });
    }

    if (ctaRef.current) {
      gsap.from(ctaRef.current, {
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.out',
        delay: 0.8,
      });
    }
  }, [title]);

  return (
    <div
      className={`absolute inset-0 flex items-center justify-center z-10 ${className}`}
    >
      <div className="container mx-auto px-4 text-center">
        <h1
          ref={titleRef}
          className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white mb-6 leading-tight"
        />

        <p
          ref={subtitleRef}
          className="text-xl md:text-2xl text-white/90 mb-8 max-w-2xl mx-auto"
        >
          {subtitle}
        </p>

        <button
          ref={ctaRef}
          onClick={onCtaClick}
          className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white font-semibold text-lg hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-lg button-luxury-gold"
        >
          {ctaText}
        </button>
      </div>
    </div>
  );
}

