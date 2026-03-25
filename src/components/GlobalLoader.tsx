import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { VideoLoader } from './VideoLoader';
import { LanguageProvider } from '../contexts/LanguageContext';

export const GlobalLoader = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Hide loader after a short delay to ensure initial paint
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <LanguageProvider>
      <AnimatePresence>
        {loading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeInOut" }}
            className="fixed inset-0 z-[999999] bg-black pointer-events-auto"
          >
            <VideoLoader size="fullscreen" />
          </motion.div>
        )}
      </AnimatePresence>
    </LanguageProvider>
  );
};
