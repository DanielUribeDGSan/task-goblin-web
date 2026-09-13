import React, { useRef, useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, useScroll, useTransform, useInView, AnimatePresence } from 'framer-motion';

interface DynamicIslandCardProps {
  imageSrc: string;
  title: string;
  description: string;
  reverse?: boolean;
}

export const DynamicIslandCard: React.FC<DynamicIslandCardProps> = ({ 
  imageSrc, 
  title, 
  description,
  reverse = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [isImageExpanded, setIsImageExpanded] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 85%", "start 30%"]
  });

  const width = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], ["70%", "80%", "90%", "100%"]);
  
  const heightDesktop = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], ["500px", "600px", "700px", "800px"]);
  const heightMobile = useTransform(scrollYProgress, [0, 0.4, 0.7, 1], ["400px", "450px", "520px", "600px"]);
  const height = isMobile ? heightMobile : heightDesktop;
  
  const borderRadius = useTransform(scrollYProgress, [0, 0.7, 1], ["30px", "24px", "24px"]);
  
  const isInView = useInView(containerRef, { once: false, amount: 0.4 });

  return (
    <div ref={containerRef} className="w-full flex justify-center py-8 min-h-[650px] md:min-h-[850px] items-center relative z-10">
      <motion.div 
        style={{ 
          width, 
          height, 
          borderRadius,
        }}
        className="bg-[#181818] shadow-2xl overflow-hidden flex flex-col relative mx-auto"
      >
        {/* The expanded card content */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex flex-col w-full h-full p-6 md:p-12 gap-6 md:gap-8 items-center justify-start overflow-y-auto overflow-x-hidden no-scrollbar"
        >
          <div className="w-full flex flex-col text-center space-y-4 shrink-0">
            <h3 className="text-4xl md:text-5xl font-semibold text-[#fafafa] tracking-tight">
              {title}
            </h3>
            <p className="text-[#8c8c8c] text-xl leading-relaxed max-w-3xl mx-auto">
              {description}
            </p>
          </div>
          <div className="w-full flex-1 relative flex items-center justify-center px-4 group">
            <img 
              src={imageSrc} 
              alt={title} 
              className="object-contain w-full h-full max-h-[500px] md:max-h-[650px] rounded-md cursor-zoom-in"
              onClick={() => setIsImageExpanded(true)}
            />
            <button 
              onClick={() => setIsImageExpanded(true)}
              className="absolute bottom-2 right-2 md:bottom-8 md:right-8 bg-[#242424]/80 backdrop-blur-md border border-[#3a3a3a] text-white p-3 rounded-full md:opacity-0 md:group-hover:opacity-100 transition-opacity shadow-lg hover:bg-[#3a3a3a]"
              aria-label="Ver imagen completa"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
            </button>
          </div>
        </motion.div>
      </motion.div>

      {/* Fullscreen Image Modal */}
      {typeof document !== 'undefined' && createPortal(
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
                transition={{ type: "spring", damping: 25, stiffness: 300 }}
                src={imageSrc}
                alt={title}
                className="w-full h-full object-contain"
              />
              <button 
                className="absolute top-6 right-6 text-white bg-[#242424]/50 hover:bg-[#242424] rounded-full p-2 transition-colors cursor-pointer"
                onClick={(e) => { e.stopPropagation(); setIsImageExpanded(false); }}
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
    </div>
  );
};
