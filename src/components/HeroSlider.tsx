import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight, Shield, Zap, Sparkles, ArrowRight } from 'lucide-react';
import { SLIDER_SLIDES } from '../data/products';

interface HeroSliderProps {
  onSelectProductFilter: (filter: string) => void;
  onOpenBooking: () => void;
  onNavigateToSimulator: () => void;
}

export const HeroSlider: React.FC<HeroSliderProps> = ({
  onSelectProductFilter,
  onOpenBooking,
  onNavigateToSimulator,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const autoPlayRef = useRef<NodeJS.Timeout | null>(null);

  const currentSlide = SLIDER_SLIDES[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % SLIDER_SLIDES.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + SLIDER_SLIDES.length) % SLIDER_SLIDES.length);
  };

  useEffect(() => {
    if (!isPaused) {
      autoPlayRef.current = setInterval(() => {
        handleNext();
      }, 5000);
    }
    return () => {
      if (autoPlayRef.current) clearInterval(autoPlayRef.current);
    };
  }, [currentIndex, isPaused]);

  const handleActionClick = (target: string) => {
    if (target === 'windshield_sunscreen') {
      onNavigateToSimulator();
    } else if (target === 'all') {
      onOpenBooking();
    } else {
      onSelectProductFilter(target);
    }
  };

  return (
    <section
      id="hero"
      aria-label="TintGo Featured Products Slider"
      className="relative w-full overflow-hidden bg-black border-b border-white/10"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Main Slide Stage */}
      <div className="relative min-h-[580px] sm:min-h-[640px] lg:min-h-[680px] flex items-center">
        {/* Background Slide Image with Crossfade */}
        <div className="absolute inset-0 z-0">
          <img
            key={currentSlide.id}
            src={currentSlide.image}
            alt={currentSlide.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-all duration-700 scale-100 ease-out"
          />
          {/* Measured Contrast Scrims */}
          <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/30 lg:to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0d0f14] via-transparent to-black/60 z-10" />
        </div>

        {/* Content Container */}
        <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-20 w-full">
          <div className="max-w-2xl">
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-red-600/20 border border-red-500/40 text-red-400 text-xs font-bold uppercase tracking-wider mb-4">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              <span>{currentSlide.badge}</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black italic tracking-wide text-white uppercase font-display leading-[1.05] drop-shadow-md">
              {currentSlide.title}
            </h1>

            {/* Subtitle */}
            <p className="mt-4 text-base sm:text-lg text-slate-300 font-normal leading-relaxed">
              {currentSlide.subtitle}
            </p>

            {/* Key Specs Row */}
            <div className="mt-8 grid grid-cols-3 gap-3 sm:gap-4 p-4 rounded-xl bg-white/[0.04] backdrop-blur-md border border-white/10">
              {currentSlide.stats.map((stat, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-xl sm:text-3xl font-black text-amber-400 font-display tabular-nums tracking-tight">
                    {stat.value}
                  </span>
                  <span className="text-xs text-slate-400 font-medium tracking-wide mt-0.5">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Actions */}
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <button
                onClick={() => handleActionClick(currentSlide.targetFilter)}
                className="px-6 py-3.5 rounded-lg bg-red-600 hover:bg-red-500 text-white font-bold tracking-wide uppercase text-sm flex items-center gap-2 shadow-lg shadow-red-900/40 transition-all hover:translate-x-0.5 cursor-pointer"
              >
                <span>{currentSlide.ctaText}</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onOpenBooking}
                className="px-6 py-3.5 rounded-lg bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold tracking-wide uppercase text-sm backdrop-blur-sm transition-all cursor-pointer"
              >
                Schedule Doorstep Visit
              </button>
            </div>
          </div>
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={handlePrev}
          aria-label="Previous slide"
          className="absolute left-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110 cursor-pointer hidden sm:flex items-center justify-center"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        <button
          onClick={handleNext}
          aria-label="Next slide"
          className="absolute right-4 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full bg-black/60 hover:bg-black/90 text-white border border-white/20 transition-all hover:scale-110 cursor-pointer hidden sm:flex items-center justify-center"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Bottom Thumbnail & Slider Progress Strip */}
      <div className="relative z-30 bg-[#12151e]/90 border-t border-white/10 px-4 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Thumbnails row */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full md:w-auto">
            {SLIDER_SLIDES.map((slide, idx) => (
              <button
                key={slide.id}
                onClick={() => setCurrentIndex(idx)}
                className={`flex items-center gap-2.5 p-2 rounded-lg text-left transition-all cursor-pointer ${
                  currentIndex === idx
                    ? 'bg-white/15 border border-red-500/80 shadow-sm'
                    : 'bg-white/5 border border-white/5 hover:bg-white/10 opacity-70 hover:opacity-100'
                }`}
              >
                <div className="w-10 h-10 rounded overflow-hidden shrink-0 bg-slate-800">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="overflow-hidden">
                  <p className="text-xs font-bold text-white truncate font-display">
                    {slide.title}
                  </p>
                  <p className="text-[11px] text-amber-400 font-medium">
                    {slide.badge}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Doorstep Trust Highlights */}
          <div className="hidden xl:flex items-center gap-6 text-xs text-slate-300">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-emerald-400" />
              <span>100% Genuine Würth & Avery Films</span>
            </div>
            <span aria-hidden="true">·</span>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-amber-400" />
              <span>Doorstep Mobile Clean Chamber</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
