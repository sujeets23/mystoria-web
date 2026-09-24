/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        void: '#050505',
        background: '#050505',
        foreground: '#FFFFFF',
        'muted-foreground': '#888888',
        primary: {
          DEFAULT: '#E1E0CC',
          foreground: '#050505',
        },
        surface: {
          DEFAULT: '#0A0A0A',
          card: '#0E0E0E',
          elevated: '#141414',
          border: 'rgba(255, 255, 255, 0.08)',
          'border-hover': 'rgba(220, 38, 38, 0.4)',
        },
        crimson: {
          DEFAULT: '#DC2626',
          deep: '#8B0000',
          dark: '#5B0000',
          bright: '#FF1E27',
          muted: 'rgba(220, 38, 38, 0.15)',
          glow: 'rgba(255, 30, 39, 0.25)',
        },
        muted: {
          light: '#CCCCCC',
          DEFAULT: '#888888',
          dark: '#444444',
          faint: '#222222',
        }
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Inter"', 'sans-serif'],
      },
      letterSpacing: {
        tighter: '-0.04em',
        tight: '-0.02em',
        widest: '0.25em',
        editorial: '0.18em',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'pulse-subtle': 'pulseSubtle 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backgroundImage: {
        'radial-crimson': 'radial-gradient(circle at 50% 50%, rgba(220, 38, 38, 0.18) 0%, rgba(5, 5, 5, 0) 70%)',
        'radial-crimson-dramatic': 'radial-gradient(ellipse at 50% 60%, rgba(220, 38, 38, 0.25) 0%, rgba(139, 0, 0, 0.12) 40%, rgba(5, 5, 5, 0) 75%)',
        'hero-gradient': 'linear-gradient(180deg, rgba(5, 5, 5, 0.7) 0%, #050505 100%)',
      }
    },
  },
  plugins: [],
}
