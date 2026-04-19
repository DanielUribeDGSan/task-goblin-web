import React from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';

interface VideoLoaderProps {
  icon?: string;
  size?: 'small' | 'medium' | 'large' | 'fullscreen';
}

export const VideoLoader = ({ icon, size = 'medium' }: VideoLoaderProps) => {
  const { t } = useLanguage();
  const [isMounted, setIsMounted] = React.useState(false);
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    setIsMounted(true);
    
    // Safety self-destruct: if still visible after 8s, start fading out
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, 8000);
    
    return () => clearTimeout(timer);
  }, []);

  const containerClasses = {
    small: "w-full h-full min-h-[150px]",
    medium: "w-full h-full min-h-[300px]",
    large: "w-full h-full min-h-[450px]",
    fullscreen: "fixed inset-0 z-[999999] bg-black"
  };

  const iconSizes = {
    small: "w-8 h-8",
    medium: "w-16 h-16",
    large: "w-24 h-24",
    fullscreen: "w-32 h-32"
  };

  const appIcons = [
    "/icon/TaskGoblin.png",
    "/icon/computer.png",
    "/icon/floaty.png"
  ];

  if (!isMounted) {
    return (
      <div className={`flex flex-col items-center justify-center overflow-hidden bg-black ${size === 'fullscreen' ? '' : 'relative'} ${containerClasses[size]}`}>
        <div className="mt-8 flex flex-col items-center gap-2">
          <span className="text-white/40 text-[10px] font-black tracking-[0.3em] uppercase">
            {t.loading}
          </span>
          <div className="h-[2px] w-24 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-sh-accent w-1/4" />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`flex flex-col items-center justify-center overflow-hidden bg-black transition-opacity duration-1000 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'} ${size === 'fullscreen' ? '' : 'relative'} ${containerClasses[size]}`}>
      {/* Space Background effect */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute inset-0 bg-radial-gradient from-white/5 to-transparent opacity-30" />
        <div suppressHydrationWarning>
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div
              key={`star-${i}`}
              className="absolute rounded-full bg-white/40"
              initial={{
                x: (Math.random() * 100).toFixed(2) + "%",
                y: (Math.random() * 100).toFixed(2) + "%",
                width: (Math.random() * 2 + 1).toFixed(2) + "px",
                height: (Math.random() * 2 + 1).toFixed(2) + "px",
                opacity: parseFloat((Math.random() * 0.5 + 0.1).toFixed(2))
              }}
              animate={{
                opacity: [0.1, 0.5, 0.1],
                scale: [1, 1.5, 1],
              }}
              transition={{
                duration: parseFloat((Math.random() * 3 + 2).toFixed(2)),
                repeat: Infinity,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </div>

      {/* Spinning Icons */}
      <div className="relative flex items-center justify-center">
        {/* Orbiting icons */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          className={`${iconSizes[size]} relative flex items-center justify-center`}
        >
          {isMounted && appIcons.map((src, i) => {
            const angle = (i * 360) / appIcons.length;
            const radius = size === 'fullscreen' ? 120 : 70;
            // Use Math.round to ensure identical values on Server and Client
            const x = Math.round(Math.cos((angle * Math.PI) / 180) * radius);
            const y = Math.round(Math.sin((angle * Math.PI) / 180) * radius);
            
            return (
              <motion.div
                key={src}
                className="absolute w-1/2 h-1/2"
                style={{
                  top: '50%',
                  left: '50%',
                  x: x,
                  y: y,
                  marginTop: '-25%',
                  marginLeft: '-25%'
                }}
                suppressHydrationWarning
              >
                <img src={src} alt="" className="w-full h-full object-contain filter drop-shadow-[0_0_15px_rgba(255,255,255,0.4)]" />
              </motion.div>
            );
          })}
        </motion.div>

        {/* Central Icon */}
        {icon && (
          <motion.div
            className={`absolute ${iconSizes[size]} z-10`}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="w-full h-full rounded-full bg-white/5 backdrop-blur-md border border-white/10 p-4 flex items-center justify-center shadow-2xl">
              <img src={icon} alt="" className="w-full h-full object-contain" />
            </div>
          </motion.div>
        )}
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="mt-8 flex flex-col items-center gap-2"
      >
        <span className="text-white/40 text-[10px] font-black tracking-[0.3em] uppercase">
          {t.loading}
        </span>
        <div className="h-[2px] w-24 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-sh-accent"
            animate={{ width: ["0%", "100%", "0%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </div>
  );
};
