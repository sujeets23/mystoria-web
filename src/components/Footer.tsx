import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUp, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  const [times, setTimes] = useState({
    nyc: '',
    london: '',
    tokyo: '',
  });

  useEffect(() => {
    const updateClocks = () => {
      const now = new Date();
      setTimes({
        nyc: now.toLocaleTimeString('en-US', { timeZone: 'America/New_York', hour: '2-digit', minute: '2-digit', hour12: false }),
        london: now.toLocaleTimeString('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit', hour12: false }),
        tokyo: now.toLocaleTimeString('ja-JP', { timeZone: 'Asia/Tokyo', hour: '2-digit', minute: '2-digit', hour12: false }),
      });
    };

    updateClocks();
    const interval = setInterval(updateClocks, 1000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    const lenis = (window as unknown as { __lenis?: { scrollTo: (target: number) => void } }).__lenis;
    if (lenis) {
      lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-[#050505] border-t border-white/[0.08] pt-20 md:pt-28 pb-12 px-6 md:px-12">
      <div className="max-w-[1400px] mx-auto">
        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16 md:pb-24 border-b border-white/[0.08]">
          {/* Brand Column */}
          <div className="md:col-span-6 lg:col-span-5 flex flex-col justify-between">
            <div>
              <Link to="/" className="inline-flex items-center gap-2 mb-4 group">
                <span className="font-display text-3xl sm:text-4xl font-extrabold tracking-tight text-white group-hover:text-white transition-colors">
                  MYSTORIA
                </span>
                <span className="w-2 h-2 rounded-full bg-crimson shadow-[0_0_10px_#DC2626]" />
              </Link>
              <p className="max-w-sm text-sm sm:text-base text-neutral-400 font-light leading-relaxed">
                Creative studio for brands that want to be remembered. We engineer identities and digital flagships with uncompromising gravity.
              </p>
            </div>

            {/* Studio Time Zones */}
            <div className="mt-10 pt-6 border-t border-white/[0.06] grid grid-cols-3 gap-4 text-xs font-mono">
              <div>
                <div className="text-neutral-500 uppercase">NEW YORK</div>
                <div className="text-white mt-1">{times.nyc || '12:00'} EST</div>
              </div>
              <div>
                <div className="text-neutral-500 uppercase">LONDON</div>
                <div className="text-white mt-1">{times.london || '17:00'} GMT</div>
              </div>
              <div>
                <div className="text-neutral-500 uppercase">TOKYO</div>
                <div className="text-white mt-1">{times.tokyo || '02:00'} JST</div>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="md:col-span-3 lg:col-span-3">
            <span className="text-xs font-mono text-neutral-500 tracking-widest uppercase block mb-6">
              // INDEX
            </span>
            <ul className="space-y-3.5">
              {[
                { name: 'Work', path: '/work' },
                { name: 'Services', path: '/services' },
                { name: 'About', path: '/about' },
                { name: 'Contact', path: '/contact' },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    to={item.path}
                    className="text-base text-neutral-300 hover:text-white hover:translate-x-1 inline-block transition-all duration-200"
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Socials & Inquiries */}
          <div className="md:col-span-3 lg:col-span-4 flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono text-neutral-500 tracking-widest uppercase block mb-6">
                // CONNECT
              </span>
              <ul className="space-y-3.5 text-base">
                {[
                  { name: 'Instagram', url: 'https://instagram.com' },
                  { name: 'Behance', url: 'https://behance.net' },
                  { name: 'LinkedIn', url: 'https://linkedin.com' },
                  { name: 'X / Twitter', url: 'https://x.com' },
                ].map((social) => (
                  <li key={social.name}>
                    <a
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-1.5 text-neutral-300 hover:text-white transition-colors"
                    >
                      <span>{social.name}</span>
                      <ArrowUpRight className="w-3.5 h-3.5 text-neutral-500 group-hover:text-crimson group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 pt-6 border-t border-white/[0.06]">
              <span className="text-xs font-mono text-neutral-500 uppercase block mb-1">
                DIRECT INQUIRY
              </span>
              <a
                href="mailto:hello@mystoria.agency"
                className="text-sm font-mono text-white hover:text-crimson transition-colors"
              >
                hello@mystoria.agency
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-500">
          <div>
            © 2026 Mystoria. All rights reserved.
          </div>

          <div className="text-center text-neutral-400">
            Designed & developed with intention.
          </div>

          <button
            onClick={scrollToTop}
            className="group inline-flex items-center gap-2 hover:text-white transition-colors"
          >
            <span>BACK TO TOP</span>
            <ArrowUp className="w-3.5 h-3.5 text-crimson group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
};
