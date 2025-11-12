'use client';

import { useEffect, useRef, useState } from 'react';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { prefersReducedMotion } from '@/lib/motion/utils';

if (typeof window !== 'undefined') {
  const { gsap } = require('gsap');
  gsap.registerPlugin(ScrollTrigger);
}

interface ScrollVideoPlayerProps {
  src: string;
  poster?: string;
  className?: string;
  start?: string;
  end?: string;
  playOnScroll?: boolean;
}

export function ScrollVideoPlayer({
  src,
  poster,
  className = '',
  start = 'top 80%',
  end = 'bottom 20%',
  playOnScroll = true,
}: ScrollVideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    if (prefersReducedMotion() || !videoRef.current || !containerRef.current || !playOnScroll) {
      return;
    }

    const video = videoRef.current;
    const container = containerRef.current;

    const scrollTrigger = ScrollTrigger.create({
      trigger: container,
      start,
      end,
      onEnter: () => {
        video.play().catch(() => {
          // Autoplay may fail, handle gracefully
        });
        setIsPlaying(true);
      },
      onLeave: () => {
        video.pause();
        setIsPlaying(false);
      },
      onEnterBack: () => {
        video.play().catch(() => {
          // Autoplay may fail, handle gracefully
        });
        setIsPlaying(true);
      },
      onLeaveBack: () => {
        video.pause();
        setIsPlaying(false);
      },
    });

    return () => {
      scrollTrigger.kill();
    };
  }, [start, end, playOnScroll]);

  return (
    <div ref={containerRef} className={className}>
      <video
        ref={videoRef}
        src={src}
        poster={poster}
        playsInline
        muted
        loop
        className="w-full h-full object-cover"
        preload="metadata"
      />
    </div>
  );
}

