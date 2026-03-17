/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: '#D4AF37',
        goldLight: '#E7C98A',
        goldDark: '#9A7B2A',
        silver: '#C9CDD6',
        silverDark: '#8A8F9A',
        blackDeep: '#050505',
        glass: 'rgba(255, 255, 255, 0.04)',
        glassBorder: 'rgba(255, 255, 255, 0.08)',
        textPrimary: '#F5F1E8',
        textMuted: '#7A756F',
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 30px rgba(212, 175, 55, 0.15)',
        glowStrong: '0 0 60px rgba(212, 175, 55, 0.25)',
        depth: '0 20px 60px rgba(0, 0, 0, 0.4)',
        card: '0 4px 30px rgba(0, 0, 0, 0.3)',
        cardHover: '0 8px 50px rgba(0, 0, 0, 0.4), 0 0 30px rgba(212, 175, 55, 0.08)',
      },
      backdropBlur: {
        glass: '20px',
      },
      backgroundImage: {
        'cinematic-radial': 'radial-gradient(circle at top, rgba(212, 175, 55, 0.08), transparent 50%)',
      },
      keyframes: {
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'pulse-gold': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '1' },
        },
        'scroll-hint': {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '40%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateY(8px)' },
        },
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-gold': 'pulse-gold 3s ease-in-out infinite',
        'scroll-hint': 'scroll-hint 2s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}