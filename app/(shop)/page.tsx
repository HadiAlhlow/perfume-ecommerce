'use client';

import { HeroVideo } from '@/components/hero/HeroVideo';
import { HeroContent } from '@/components/hero/HeroContent';
import { ProductGrid } from '@/components/products/ProductGrid';
import { GSAPScrollReveal } from '@/components/animations/GSAPScrollReveal';
import { ScrollVideoPlayer } from '@/components/animations/ScrollVideoPlayer';
import { CategoryScrollShowcase } from '@/components/categories/CategoryScrollShowcase';

export default function HomePage() {
  // Try to use the video, fallback to a placeholder if not found
  const videoSrc = '/videos/7815751-hd_1920_1080_25fps.mp4';

  return (
    <>
      {/* Hero Section with Infinite Loop Video */}
      <section className="relative h-screen">
        <HeroVideo videoSrc={videoSrc} />
        <HeroContent
          title="Discover Your Signature Scent"
          subtitle="Explore our curated collection of luxury perfumes from around the world"
          ctaText="Shop Now"
          onCtaClick={() => {
            if (typeof window !== 'undefined') {
              window.location.href = '/categories/floral';
            }
          }}
        />
      </section>

      {/* Category Showcase - Immersive Scroll */}
      <section className="container-lg mx-auto px-4 py-20">
        <GSAPScrollReveal direction="up">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Explore Our Categories
          </h2>
        </GSAPScrollReveal>
        <CategoryScrollShowcase />
      </section>

      {/* Featured Products */}
      <section className="container-lg mx-auto px-4 py-20">
        <GSAPScrollReveal direction="up">
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Featured Products
          </h2>
        </GSAPScrollReveal>
        <ProductGrid featured={true} limit={6} />
      </section>

      {/* Scroll-triggered Video Section */}
      <section className="container-lg mx-auto px-4 py-20">
        <GSAPScrollReveal direction="up">
          <div className="relative h-[600px] rounded-2xl overflow-hidden">
            <ScrollVideoPlayer
              src={videoSrc}
              playOnScroll={true}
              className="w-full h-full"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center glass p-8 rounded-2xl">
                <h3 className="text-3xl font-bold mb-4 text-white">
                  Experience Luxury
                </h3>
                <p className="text-white/90">
                  Watch our collection come to life
                </p>
              </div>
            </div>
          </div>
        </GSAPScrollReveal>
      </section>
    </>
  );
}
