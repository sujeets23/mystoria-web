import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { TextRollLink } from '@/components/ui/text-roll-link';

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  const navLinks = [
    { name: 'Work', path: '/work' },
    { name: 'Services', path: '/services' },
    { name: 'Articles', path: '/blog' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isHome = location.pathname === '/';

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
          isScrolled
            ? 'py-4 bg-[#050505]/85 backdrop-blur-md border-b border-white/[0.07] shadow-[0_10px_30px_rgba(0,0,0,0.8)]'
            : isHome
            ? 'py-6 md:py-8 bg-transparent border-b border-transparent pointer-events-none'
            : 'py-6 md:py-8 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 md:px-12 flex items-center justify-between pointer-events-auto">
          {/* Logo */}
          <Link
            to="/"
            className={`group flex items-center gap-1.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-crimson transition-opacity duration-300 ${
              isHome && !isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <span className="font-display text-xl md:text-2xl font-bold tracking-tight text-white transition-colors duration-300 group-hover:text-white">
              MYSTORIA
            </span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-crimson shadow-[0_0_10px_#DC2626] transition-transform duration-300 group-hover:scale-150" />
          </Link>

          {/* Desktop Nav Links */}
          <nav
            className={`hidden md:flex items-center gap-8 lg:gap-10 transition-opacity duration-300 ${
              isHome && !isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            {navLinks.map((link) => {
              const isActive = location.pathname === link.path;
              return (
                <TextRollLink
                  key={link.name}
                  to={link.path}
                  className="relative py-1 text-sm font-medium tracking-wide text-neutral-400 hover:text-white transition-colors duration-200"
                  suffix={
                    isActive ? (
                      <motion.span
                        layoutId="activeNavIndicator"
                        className="absolute -bottom-1 left-0 right-0 h-[2px] bg-crimson shadow-[0_0_8px_#DC2626]"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    ) : null
                  }
                >
                  {link.name}
                </TextRollLink>
              );
            })}
          </nav>

          {/* Desktop Action Button */}
          <div
            className={`hidden md:flex items-center transition-opacity duration-300 ${
              isHome && !isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            <Link
              to="/contact"
              data-cursor="cta"
              className="group relative inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-surface-card border border-white/10 hover:border-crimson/60 hover:bg-crimson/10 transition-all duration-300 shadow-sm"
            >
              <span>Let's Talk</span>
              <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400 transition-transform duration-300 group-hover:text-crimson group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          {/* Mobile Menu Trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle navigation menu"
            className={`md:hidden p-2 text-neutral-300 hover:text-white focus:outline-none transition-opacity duration-300 ${
              isHome && !isScrolled ? 'opacity-0 pointer-events-none' : 'opacity-100'
            }`}
          >
            {mobileMenuOpen ? <X className="w-6 h-6 text-white" /> : <Menu className="w-6 h-6 text-white" />}
          </button>
        </div>
      </header>

      {/* Mobile Full-Screen Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-30 bg-[#050505] flex flex-col justify-between px-6 pt-28 pb-10 md:hidden"
          >
            {/* Subtle atmospheric glow behind menu */}
            <div className="absolute top-1/3 -right-20 w-80 h-80 rounded-full bg-crimson/15 blur-[120px] pointer-events-none" />

            <nav className="flex flex-col gap-6 mt-4">
              <span className="text-[11px] font-mono tracking-widest text-neutral-500 uppercase">
                // NAVIGATION
              </span>
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 * idx, duration: 0.3 }}
                >
                  <Link
                    to={link.path}
                    className="flex items-center justify-between py-2 text-3xl font-display font-bold uppercase text-white hover:text-crimson transition-colors"
                  >
                    <span>{link.name}</span>
                    <span className="text-xs font-mono text-neutral-600">0{idx + 1}</span>
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.3 }}
                className="pt-6"
              >
                <Link
                  to="/contact"
                  className="w-full py-4 rounded-full flex items-center justify-center gap-2 bg-crimson hover:bg-crimson-bright text-white font-display font-semibold tracking-wider text-sm uppercase transition-colors"
                >
                  <span>Start a Project</span>
                  <ArrowUpRight className="w-4 h-4" />
                </Link>
              </motion.div>
            </nav>

            {/* Mobile Footer Info */}
            <div className="pt-8 border-t border-white/10 flex flex-col gap-3">
              <div className="flex justify-between items-center text-xs text-neutral-400">
                <span>INQUIRIES</span>
                <a href="mailto:hello@mystoria.agency" className="text-white hover:text-crimson transition-colors">
                  hello@mystoria.agency
                </a>
              </div>
              <div className="flex justify-between items-center text-xs text-neutral-500">
                <span>HEADQUARTERS</span>
                <span className="text-white font-medium">MUMBAI, INDIA</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
