import React, { useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  motion,
  useScroll,
  useMotionValueEvent,
  AnimatePresence,
} from 'framer-motion';

export interface FeatureItem {
  image: string;
  title: string;
  description: string;
}

interface FeaturesOverviewProps {
  features: FeatureItem[];
}

export const FeaturesOverview: React.FC<FeaturesOverviewProps> = ({ features }) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [overallProgress, setOverallProgress] = useState(0);
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: trackRef,
    offset: ['start start', 'end end'],
  });

  useMotionValueEvent(scrollYProgress, 'change', (value) => {
    setOverallProgress(value);
    const next = Math.min(
      features.length - 1,
      Math.max(0, Math.floor(value * features.length))
    );
    setActiveIndex(next);
  });

  const featureLocalProgress = (index: number) => {
    const start = index / features.length;
    const end = (index + 1) / features.length;
    if (overallProgress <= start) return 0;
    if (overallProgress >= end) return 1;
    return (overallProgress - start) / (end - start);
  };

  const scrollToFeature = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const trackTop = track.getBoundingClientRect().top + window.scrollY;
    const scrollable = track.offsetHeight - window.innerHeight;
    const target =
      trackTop + ((index + 0.35) / features.length) * scrollable;
    window.scrollTo({ top: target, behavior: 'smooth' });
  };

  return (
    <>
      {/* Desktop: sticky scrollytelling (ChatGPT overview style) */}
      <div
        ref={trackRef}
        className="relative z-10 hidden lg:block"
        style={{ height: `${Math.max(features.length, 1) * 100}vh` }}
      >
        <div className="sticky top-0 h-screen flex items-center overflow-hidden">
          <div className="mx-auto w-full max-w-[86rem] px-8 xl:px-12 grid grid-cols-12 gap-6 xl:gap-10 items-center">
            {/* Left accordion */}
            <div className="col-span-4 xl:col-span-3 flex flex-col justify-center relative z-20 max-h-[min(85vh,820px)] overflow-y-auto scrollbar-hide pr-1">
              {features.map((feature, index) => {
                const isActive = index === activeIndex;
                const local = featureLocalProgress(index);
                const isPast = index < activeIndex;

                return (
                  <button
                    key={feature.title}
                    type="button"
                    onClick={() => scrollToFeature(index)}
                    className="group relative w-full text-left border-t border-white/[0.10] first:border-t-0 py-2.5 xl:py-3 cursor-pointer focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white/30 rounded-sm"
                  >
                    <div className="flex flex-col gap-1">
                      <span
                        className={`text-[0.95rem] xl:text-[1.125rem] font-medium tracking-[-0.02em] transition-colors duration-500 leading-snug ${
                          isActive
                            ? 'text-[#fafafa]'
                            : 'text-[#fafafa]/35 group-hover:text-[#fafafa]/55'
                        }`}
                      >
                        {feature.title}
                      </span>

                      {/* Progress bar — fills while this feature is active / stays filled if past */}
                      <div className="h-[2px] w-full bg-white/[0.08] overflow-hidden rounded-full">
                        <div
                          className="h-full bg-[#fafafa]/70 transition-[width] duration-100 ease-linear"
                          style={{
                            width: `${(isPast ? 1 : isActive ? local : 0) * 100}%`,
                          }}
                        />
                      </div>

                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.p
                            key={`desc-${feature.title}`}
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{
                              duration: 0.45,
                              ease: [0.22, 1, 0.36, 1],
                            }}
                            className="text-[#b4b4b4] text-[0.8rem] xl:text-[0.9rem] leading-relaxed overflow-hidden pt-1"
                          >
                            {feature.description}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Right sticky mockup */}
            <div className="col-span-8 xl:col-span-9 relative flex items-center justify-center px-4 xl:px-10">
              <div className="relative w-full max-h-[min(68vh,640px)] aspect-[16/10] rounded-2xl overflow-hidden bg-[#141414] border border-white/[0.08] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.7)]">
                {features.map((feature, index) => (
                  <motion.div
                    key={feature.image}
                    className="absolute inset-0"
                    initial={false}
                    animate={{
                      opacity: index === activeIndex ? 1 : 0,
                      scale: index === activeIndex ? 1 : 0.985,
                    }}
                    transition={{
                      duration: 0.55,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{ pointerEvents: index === activeIndex ? 'auto' : 'none' }}
                  >
                    <img
                      src={feature.image}
                      alt={feature.title}
                      className="w-full h-full object-contain object-center cursor-zoom-in"
                      onClick={() => setIsImageExpanded(true)}
                      draggable={false}
                    />
                  </motion.div>
                ))}

                <button
                  type="button"
                  onClick={() => setIsImageExpanded(true)}
                  className="absolute bottom-3 right-3 z-20 bg-[#242424]/80 backdrop-blur-md border border-[#3a3a3a] text-white p-2.5 rounded-full opacity-0 hover:opacity-100 focus:opacity-100 transition-opacity shadow-lg hover:bg-[#3a3a3a] cursor-pointer"
                  aria-label="Ver imagen completa"
                >
                  <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile / tablet: stacked cards */}
      <div className="relative z-10 lg:hidden px-6 sm:px-10 pb-24 flex flex-col gap-12">
        {features.map((feature, index) => (
          <motion.div
            key={feature.title}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.35 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col gap-4"
          >
            <div className="space-y-2 px-1">
              <h3 className="text-xl sm:text-2xl font-medium tracking-tight text-[#fafafa]">
                {feature.title}
              </h3>
              <p className="text-[#8c8c8c] text-sm sm:text-base leading-relaxed">
                {feature.description}
              </p>
            </div>
            <div className="rounded-xl overflow-hidden border border-white/[0.08] bg-transparent">
              <img
                src={feature.image}
                alt={feature.title}
                className="w-full h-auto object-contain object-center cursor-zoom-in block"
                onClick={() => {
                  setActiveIndex(index);
                  setIsImageExpanded(true);
                }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Fullscreen image modal */}
      {typeof document !== 'undefined' &&
        createPortal(
          <AnimatePresence>
            {isImageExpanded && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm p-4 md:p-12 cursor-zoom-out"
                onClick={() => setIsImageExpanded(false)}
              >
                <motion.img
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.9, opacity: 0 }}
                  transition={{ type: 'spring', damping: 25, stiffness: 300 }}
                  src={features[activeIndex]?.image}
                  alt={features[activeIndex]?.title}
                  className="w-full h-full object-contain"
                />
                <button
                  type="button"
                  className="absolute top-6 right-6 text-white bg-[#242424]/50 hover:bg-[#242424] rounded-full p-2 transition-colors cursor-pointer"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsImageExpanded(false);
                  }}
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};
