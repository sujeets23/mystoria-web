import React, { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export const CustomCursor: React.FC = () => {
  const [cursorMode, setCursorMode] = useState<'default' | 'link' | 'view' | 'cta'>('default');
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(true);

  // Raw mouse coordinates
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth spring physics for fluid interpolation
  const springConfig = { damping: 25, stiffness: 350, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    // Detect touch / coarse pointer devices
    const checkTouch = () => {
      const isCoarse = window.matchMedia('(pointer: coarse)').matches;
      const isMobileWidth = window.innerWidth <= 1024;
      setIsTouchDevice(isCoarse || isMobileWidth);
    };

    checkTouch();
    window.addEventListener('resize', checkTouch);

    const handleMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      // Check target hierarchy for cursor attributes
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const viewElement = target.closest('[data-cursor="view"]');
      const ctaElement = target.closest('[data-cursor="cta"]');
      const interactiveElement = target.closest('a, button, input, textarea, select, [role="button"]');

      if (viewElement) {
        setCursorMode('view');
      } else if (ctaElement) {
        setCursorMode('cta');
      } else if (interactiveElement) {
        setCursorMode('link');
      } else {
        setCursorMode('default');
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('resize', checkTouch);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [isVisible, mouseX, mouseY]);

  if (isTouchDevice || !isVisible) {
    return null;
  }

  return (
    <>
      {/* Center dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[100] rounded-full mix-blend-difference"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorMode === 'view' ? 0 : 5,
          height: cursorMode === 'view' ? 0 : 5,
          backgroundColor: '#FFFFFF',
          opacity: cursorMode === 'view' ? 0 : 1,
        }}
        transition={{ duration: 0.15 }}
      />

      {/* Outer smooth tracking element */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[99] flex items-center justify-center rounded-full"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{
          width: cursorMode === 'view' ? 84 : cursorMode === 'cta' ? 56 : cursorMode === 'link' ? 44 : 26,
          height: cursorMode === 'view' ? 84 : cursorMode === 'cta' ? 56 : cursorMode === 'link' ? 44 : 26,
          backgroundColor: cursorMode === 'view' 
            ? 'rgba(220, 38, 38, 0.95)' 
            : cursorMode === 'cta' 
            ? 'rgba(220, 38, 38, 0.2)' 
            : 'rgba(255, 255, 255, 0.03)',
          borderColor: cursorMode === 'view' 
            ? 'rgba(255, 255, 255, 0.4)' 
            : cursorMode === 'cta' 
            ? 'rgba(220, 38, 38, 0.8)' 
            : cursorMode === 'link' 
            ? 'rgba(220, 38, 38, 0.6)' 
            : 'rgba(255, 255, 255, 0.3)',
          borderWidth: cursorMode === 'view' ? 1 : 1,
          boxShadow: cursorMode === 'view' 
            ? '0 0 30px rgba(220, 38, 38, 0.5)' 
            : cursorMode === 'cta' 
            ? '0 0 20px rgba(220, 38, 38, 0.3)' 
            : 'none',
        }}
        transition={{ duration: 0.2, ease: 'easeOut' }}
      >
        {cursorMode === 'view' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.6 }}
            className="text-[11px] font-bold tracking-[0.2em] text-white uppercase font-display"
          >
            VIEW
          </motion.span>
        )}
      </motion.div>
    </>
  );
};
