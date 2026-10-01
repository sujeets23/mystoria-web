import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useRef } from "react";
import { Link } from "react-router-dom";

/* ---------------- WordsPullUp ---------------- */
interface WordsPullUpProps {
  text: string;
  className?: string;
  showAsterisk?: boolean;
  style?: React.CSSProperties;
}

export const WordsPullUp = ({
  text,
  className = "",
  showAsterisk = false,
  style,
}: WordsPullUpProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });
  const words = text.split(" ");

  return (
    <div
      ref={ref}
      className={`inline-flex flex-wrap ${className}`}
      style={style}
    >
      {words.map((word, i) => {
        const isLast = i === words.length - 1;

        return (
          <motion.span
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : {}}
            transition={{
              duration: 0.6,
              delay: i * 0.08,
              ease: [0.16, 1, 0.3, 1],
            }}
            className="inline-block relative"
            style={{ marginRight: isLast ? 0 : "0.25em" }}
          >
            {word}

            {showAsterisk && isLast && (
              <span className="absolute top-[0.45em] -right-[0.3em] text-[0.35em] text-[#DC2626]">
                *
              </span>
            )}
          </motion.span>
        );
      })}
    </div>
  );
};

/* ---------------- WordsPullUpMultiStyle ---------------- */

interface Segment {
  text: string;
  className?: string;
}

interface WordsPullUpMultiStyleProps {
  segments: Segment[];
  className?: string;
  style?: React.CSSProperties;
}

export const WordsPullUpMultiStyle = ({
  segments,
  className = "",
  style,
}: WordsPullUpMultiStyleProps) => {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  const words: { word: string; className?: string }[] = [];

  segments.forEach((seg) => {
    seg.text.split(" ").forEach((w) => {
      if (w) {
        words.push({
          word: w,
          className: seg.className,
        });
      }
    });
  });

  return (
    <div
      ref={ref}
      className={`inline-flex flex-wrap justify-center ${className}`}
      style={style}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          initial={{ y: 20, opacity: 0 }}
          animate={isInView ? { y: 0, opacity: 1 } : {}}
          transition={{
            duration: 0.6,
            delay: i * 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
          className={`inline-block ${w.className ?? ""}`}
          style={{ marginRight: "0.25em" }}
        >
          {w.word}
        </motion.span>
      ))}
    </div>
  );
};

/* ---------------- Hero ---------------- */

const navItems = [
  { label: "About", path: "/about" },
  { label: "Services", path: "/services" },
  { label: "Work", path: "/work" },
  { label: "Process", path: "#process" },
  { label: "Contact", path: "/contact" },
];

const PrismaHero = () => {
  return (
    <section aria-label="Hero section" className="min-h-screen h-screen w-full p-2 sm:p-3 md:p-4">
      <div className="relative h-full w-full overflow-hidden rounded-2xl md:rounded-[2rem] border border-white/[0.08] shadow-[0_25px_60px_rgba(0,0,0,0.9)]">

        {/* Background video with high-definition cinematic loop */}
        <video
          autoPlay
          loop
          muted
          playsInline
          poster="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1600&q=80"
          className="absolute inset-0 h-full w-full object-cover"
          src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260405_170732_8a9ccda6-5cff-4628-b164-059c500a2b41.mp4"
        />

        {/* Noise overlay */}
        <div className="noise-overlay pointer-events-none absolute inset-0 opacity-[0.55] mix-blend-overlay" />

        {/* Subtle red atmospheric gradient + dark cinematic vignettes */}
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/10 to-black/85" />
        <div 
          aria-hidden="true" 
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-2/3 bg-gradient-to-t from-[#050505] via-[#050505]/60 to-transparent" 
        />
        <div 
          aria-hidden="true"
          className="pointer-events-none absolute top-1/3 -right-20 w-96 h-96 rounded-full bg-crimson/15 blur-[120px]" 
        />

        {/* Navbar */}
        <nav aria-label="Hero navigation" className="absolute left-1/2 top-0 z-20 -translate-x-1/2">
          <div className="flex items-center gap-3 rounded-b-2xl bg-[#0A0A0A]/90 backdrop-blur-md border-b border-x border-white/10 px-4 py-2.5 sm:gap-6 md:gap-10 md:rounded-b-3xl md:px-8 lg:gap-12 shadow-lg">
            {navItems.map((item) => (
              item.path.startsWith('#') ? (
                <a
                  key={item.label}
                  href={item.path}
                  className="text-[11px] font-mono uppercase tracking-wider transition-colors sm:text-xs md:text-sm"
                  style={{
                    color: "rgba(225, 224, 204, 0.8)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#FFFFFF")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color =
                      "rgba(225, 224, 204, 0.8)")
                  }
                >
                  {item.label}
                </a>
              ) : (
                <Link
                  key={item.label}
                  to={item.path}
                  className="text-[11px] font-mono uppercase tracking-wider transition-colors sm:text-xs md:text-sm"
                  style={{
                    color: "rgba(225, 224, 204, 0.8)",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#FFFFFF")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color =
                      "rgba(225, 224, 204, 0.8)")
                  }
                >
                  {item.label}
                </Link>
              )
            ))}
          </div>
        </nav>

        {/* Hero content */}
        <div className="absolute bottom-0 left-0 right-0 px-4 pb-4 sm:px-6 md:px-10 lg:px-12 md:pb-8">
          <div className="grid grid-cols-12 items-end gap-4 md:gap-6">

            <div className="col-span-12 lg:col-span-8">
              <h1
                className="font-display font-medium leading-[0.82] tracking-[-0.07em] text-[20vw] sm:text-[18vw] md:text-[16vw] lg:text-[14.5vw] xl:text-[14vw]"
                style={{ color: "#E1E0CC" }}
              >
                <WordsPullUp text="Mystoria" showAsterisk />
              </h1>
            </div>

            <div className="col-span-12 flex flex-col gap-4 pb-3 sm:pb-6 lg:col-span-4 lg:pb-8">

              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.5,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="text-xs text-neutral-300 sm:text-sm md:text-base font-light leading-relaxed max-w-lg"
              >
                Mystoria is a growth studio and a partner for every company with vision. We engineer data-obsessed performance marketing, creator ecosystems, SEO dominance, and cinematic ad production for brands ready to scale.
              </motion.p>

              <motion.div
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{
                  duration: 0.8,
                  delay: 0.7,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <Link
                  to="/contact"
                  data-cursor="cta"
                  className="group inline-flex items-center gap-3 self-start rounded-full bg-[#E1E0CC] hover:bg-white py-1.5 pl-6 pr-1.5 text-xs sm:text-sm font-display font-bold uppercase tracking-wider text-black transition-all hover:gap-4 shadow-[0_0_25px_rgba(225,224,204,0.3)] hover:shadow-[0_0_35px_rgba(220,38,38,0.5)]"
                >
                  <span>Start a project</span>

                  <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full bg-black group-hover:bg-crimson transition-all group-hover:scale-110">
                    <ArrowRight
                      className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-[#E1E0CC] group-hover:text-white transition-colors"
                    />
                  </span>
                </Link>
              </motion.div>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export { PrismaHero };
