/**
 * Décor Dynasty — Tailwind config.
 * Tokens are taken 1:1 from the uploaded HTML (source of truth).
 * Breakpoints mirror the HTML's own media queries:
 *   ≤640px  = mobile layout   → `sm` starts at 641px
 *   ≤1024px = 2-column layout → `lg` starts at 1025px
 * @type {import('tailwindcss').Config}
 */
export default {
  future: {
    // hover: utilities only apply on devices that can hover (no sticky hover on touch)
    hoverOnlyWhenSupported: true,
  },
  content: ['./public/**/*.php', './src/components/**/*.php', './src/js/**/*.js'],
  theme: {
    screens: {
      sm: '641px',
      md: '768px',
      lg: '1025px',
      xl: '1280px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        accent: 'var(--accent)', // #885F52
        ink: '#2B2523', // body text, links
        cream: '#F7F7F2', // page background
        line: '#EDE4DF', // borders, avatar bg
        muted: '#6B625E', // testimonial role
        soft: '#4F4946', // footer links / address
        brand: '#3A3533', // footer tagline
        tint: '#F7F2EF', // menu hover
        whatsapp: '#25D366',
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        sans: ['Outfit', 'sans-serif'],
        serif: ['Gloock', 'serif'],
      },
      maxWidth: {
        wrap: '1240px',
      },
      borderRadius: {
        card: '20px',
      },
      spacing: {
        gutter: 'var(--gutter)',
        section: 'var(--section)',
        stack: 'var(--stack)',
      },
      letterSpacing: {
        tightest: '-0.045em',
      },
      transitionTimingFunction: {
        out: 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
    },
  },
  plugins: [],
};
