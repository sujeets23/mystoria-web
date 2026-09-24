import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { motion, type Variants } from "framer-motion";
import { cn } from "@/lib/utils";

// Basic Component placeholder as requested in the snippet
export const Component = () => {
  const [count, setCount] = useState(0);

  return (
    <div className={cn("flex flex-col items-center gap-4 p-4 rounded-lg")}>
      <h1 className="text-2xl font-bold mb-2">Component Example</h1>
      <h2 className="text-xl font-semibold">{count}</h2>
      <div className="flex gap-2">
        <button onClick={() => setCount((prev) => prev - 1)}>-</button>
        <button onClick={() => setCount((prev) => prev + 1)}>+</button>
      </div>
    </div>
  );
};

export interface ServiceHoverItem {
  title: string;
  subtitle?: string;
  category?: string;
  color?: string;
  src: string;
  href?: string;
}

const defaultServices: ServiceHoverItem[] = [
  {
    title: "Brand Identity & Strategy",
    subtitle: "Enduring visual systems & positioning",
    category: "01 / BRANDING",
    color: "#0E0E0E",
    src: "https://images.unsplash.com/photo-1545454675-3531b543be5d?auto=format&fit=crop&w=1200&q=80",
    href: "/services",
  },
  {
    title: "Digital Platforms & WebGL",
    subtitle: "Custom flagships with kinetic elegance",
    category: "02 / DIGITAL",
    color: "#121212",
    src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=1200&q=80",
    href: "/services",
  },
  {
    title: "Motion & 3D Dimensional",
    subtitle: "Kinetic gravity that commands attention",
    category: "03 / MOTION",
    color: "#0A0A0A",
    src: "https://images.unsplash.com/photo-1509631179647-0177331693ae?auto=format&fit=crop&w=1200&q=80",
    href: "/services",
  },
  {
    title: "Creative Direction & Campaigns",
    subtitle: "Provocative narratives with cultural resonance",
    category: "04 / CREATIVE",
    color: "#141414",
    src: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
    href: "/services",
  },
];

const scaleAnimation: Variants = {
  closed: {
    scale: 0,
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] },
    x: "-50%",
    y: "-50%",
  },
  enter: {
    scale: 1,
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] },
    x: "-50%",
    y: "-50%",
  },
  initial: { scale: 0, x: "-50%", y: "-50%" },
};

interface ServicesWithAnimatedHoverModalProps {
  items?: ServiceHoverItem[];
  label?: string;
  description?: string;
  badgeText?: string;
  actionText?: string;
  className?: string;
}

export function ServicesWithAnimatedHoverModal({
  items = defaultServices,
  label = "Capabilities.",
  description = "Our practices operate at the convergence of brand strategy, high-precision code, and cinematic art direction to build enduring digital authority.",
  badgeText = "WHAT WE DO",
  actionText = "Explore",
  className,
}: ServicesWithAnimatedHoverModalProps) {
  const [modal, setModal] = useState({ active: false, index: 0 });

  return (
    <div className={cn("relative py-12 md:py-20 overflow-visible", className)}>
      <div className="mx-auto max-w-[1400px]">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div>
            <div className="inline-flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-crimson" />
              <span className="text-xs font-mono tracking-[0.25em] text-neutral-400 uppercase">
                {badgeText}
              </span>
            </div>
            <h2 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold uppercase tracking-tight text-white">
              {label}
            </h2>
          </div>

          <p className="max-w-md text-sm md:text-base font-light text-neutral-400 leading-relaxed">
            {description}
          </p>
        </div>

        {/* Services List Table */}
        <div className="relative flex flex-col w-full border-t border-white/[0.08]">
          {items.map((item, index) => (
            <ServiceRow
              key={item.title}
              index={index}
              item={item}
              setModal={setModal}
            />
          ))}

          {/* Floating Hover Modal & Cursor Follower */}
          <HoverModal modal={modal} items={items} actionText={actionText} />
        </div>
      </div>
    </div>
  );
}

interface ServiceRowProps {
  index: number;
  item: ServiceHoverItem;
  setModal: React.Dispatch<React.SetStateAction<{ active: boolean; index: number }>>;
}

function ServiceRow({ index, item, setModal }: ServiceRowProps) {
  return (
    <a
      href={item.href || "#"}
      className="group relative flex w-full cursor-pointer items-center justify-between border-b border-white/[0.08] py-8 sm:py-12 md:py-14 px-4 sm:px-8 transition-colors duration-300 hover:bg-white/[0.02]"
      onMouseEnter={() => setModal({ active: true, index })}
      onMouseLeave={() => setModal({ active: false, index })}
    >
      <div className="flex flex-col md:flex-row md:items-baseline gap-2 md:gap-8 transition-transform duration-300 group-hover:translate-x-3">
        <span className="text-xs font-mono text-crimson uppercase tracking-widest">
          {item.category || `0${index + 1}`}
        </span>
        <h3 className="m-0 font-display text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase tracking-tight text-white group-hover:text-white transition-colors">
          {item.title}
        </h3>
      </div>

      <div className="hidden sm:flex items-center gap-6 transition-transform duration-300 group-hover:translate-x-3">
        <p className="font-light text-xs sm:text-sm text-neutral-400 max-w-xs text-right">
          {item.subtitle || "Design & Development"}
        </p>
        <div className="w-8 h-8 rounded-full border border-white/20 flex items-center justify-center text-white/50 group-hover:border-crimson group-hover:text-crimson transition-colors">
          →
        </div>
      </div>
    </a>
  );
}

interface HoverModalProps {
  modal: { active: boolean; index: number };
  items: ServiceHoverItem[];
  actionText?: string;
}

function HoverModal({ modal, items, actionText = "Explore" }: HoverModalProps) {
  const { active, index } = modal;
  const modalContainer = useRef<HTMLDivElement>(null);
  const cursor = useRef<HTMLDivElement>(null);
  const cursorLabel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!modalContainer.current || !cursor.current || !cursorLabel.current) return;

    // Move Container
    const xMoveContainer = gsap.quickTo(modalContainer.current, "left", {
      duration: 0.8,
      ease: "power3",
    });
    const yMoveContainer = gsap.quickTo(modalContainer.current, "top", {
      duration: 0.8,
      ease: "power3",
    });

    // Move cursor
    const xMoveCursor = gsap.quickTo(cursor.current, "left", {
      duration: 0.5,
      ease: "power3",
    });
    const yMoveCursor = gsap.quickTo(cursor.current, "top", {
      duration: 0.5,
      ease: "power3",
    });

    // Move cursor label
    const xMoveCursorLabel = gsap.quickTo(cursorLabel.current, "left", {
      duration: 0.45,
      ease: "power3",
    });
    const yMoveCursorLabel = gsap.quickTo(cursorLabel.current, "top", {
      duration: 0.45,
      ease: "power3",
    });

    const handleMouseMove = (e: MouseEvent) => {
      const { pageX, pageY } = e;
      xMoveContainer(pageX);
      yMoveContainer(pageY);
      xMoveCursor(pageX);
      yMoveCursor(pageY);
      xMoveCursorLabel(pageX);
      yMoveCursorLabel(pageY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {/* Floating Image Preview Modal */}
      <motion.div
        ref={modalContainer}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className="pointer-events-none fixed z-30 flex h-72 sm:h-80 w-80 sm:w-96 items-center justify-center overflow-hidden rounded-2xl border border-white/20 bg-[#0E0E0E] shadow-[0_25px_60px_rgba(0,0,0,0.9)]"
      >
        <div
          className="absolute h-full w-full transition-[top] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
          style={{ top: `${index * -100}%` }}
        >
          {items.map((item, idx) => (
            <div
              key={idx}
              className="flex h-full w-full items-center justify-center relative overflow-hidden"
              style={{ backgroundColor: item.color || "#0A0A0A" }}
            >
              <img
                src={item.src}
                alt={item.title}
                className="w-full h-full object-cover grayscale-[20%] contrast-[110%]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-xs font-mono text-white/90">
                <span className="text-crimson font-bold">{item.category}</span>
                <span className="uppercase text-[11px] tracking-wider text-neutral-300">EXPLORE</span>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Floating Red Circular Cursor Badge */}
      <motion.div
        ref={cursor}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className="pointer-events-none fixed z-40 flex h-20 w-20 items-center justify-center rounded-full bg-crimson font-mono text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_25px_#DC2626]"
      />

      <motion.div
        ref={cursorLabel}
        variants={scaleAnimation}
        initial="initial"
        animate={active ? "enter" : "closed"}
        className="pointer-events-none fixed z-40 flex h-20 w-20 items-center justify-center rounded-full bg-transparent font-mono text-xs font-bold uppercase tracking-wider text-white"
      >
        {actionText}
      </motion.div>
    </>
  );
}

export default ServicesWithAnimatedHoverModal;
