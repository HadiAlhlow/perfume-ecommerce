'use client';

import { useEffect, useRef, useState } from 'react';

interface HeroVideoProps {
  videoSrc: string;
  className?: string;
}

export function HeroVideo({ videoSrc, className = '' }: HeroVideoProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [videoError, setVideoError] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set video properties
    video.loop = true;
    video.muted = true;
    video.playsInline = true;

    // Handle video loaded
    const handleLoadedData = () => {
      // Try to play the video
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise
          .then(() => {
            setIsPlaying(true);
            console.log('Video is playing');
          })
          .catch((error) => {
            console.warn('Video autoplay failed:', error);
            // Try again after user interaction
            document.addEventListener('click', () => {
              video.play().catch(() => {
                console.warn('Video play failed after user interaction');
              });
            }, { once: true });
          });
      }
    };

    // Handle video errors
    const handleError = (e: Event) => {
      console.error('Video load error:', e);
      setVideoError(true);
      if (video.parentElement) {
        video.style.display = 'none';
      }
    };

    // Handle video can play
    const handleCanPlay = () => {
      video.play().catch((error) => {
        console.warn('Video play on canplay failed:', error);
      });
    };

    // Add event listeners
    video.addEventListener('loadeddata', handleLoadedData);
    video.addEventListener('error', handleError);
    video.addEventListener('canplay', handleCanPlay);
    video.addEventListener('playing', () => setIsPlaying(true));
    video.addEventListener('pause', () => setIsPlaying(false));

    // Try to play immediately if video is already loaded
    if (video.readyState >= 2) {
      handleLoadedData();
    }

    return () => {
      video.removeEventListener('loadeddata', handleLoadedData);
      video.removeEventListener('error', handleError);
      video.removeEventListener('canplay', handleCanPlay);
    };
  }, [videoSrc]);

  return (
    <div className={`relative w-full h-screen overflow-hidden ${className}`}>
      {!videoError ? (
        <video
          ref={videoRef}
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover z-0"
          preload="auto"
          onError={(e) => {
            console.error('Video load error:', e);
            setVideoError(true);
            const videoElement = e.currentTarget;
            if (videoElement.parentElement) {
              videoElement.style.display = 'none';
            }
          }}
        />
      ) : null}
      
      {/* Fallback gradient background - only show if video failed or not playing */}
      <div 
        className={`absolute inset-0 bg-gradient-to-br from-purple-900 via-pink-900 to-orange-900 z-0 transition-opacity duration-500 ${
          videoError || !isPlaying ? 'opacity-100' : 'opacity-0'
        }`}
      />
      
      {/* Overlay gradient - always visible for text readability */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/10 to-black/40 z-10" />
    </div>
  );
}

