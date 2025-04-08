/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      colors: {
        primary: {
          DEFAULT: "#06363D",
          foreground: "#FFFFFF",
          50: "#E0EDE9",
          100: "#CCDCD8",
          200: "#A3C3C0",
          300: "#84BABF",
          400: "#3D8589",
          500: "#06363D",
          600: "#052E34",
          700: "#04262B",
          800: "#031D21",
          900: "#021518",
        },
        secondary: {
          DEFAULT: "#0D6F73",
          foreground: "#FFFFFF",
        },
        accent: {
          DEFAULT: "#085558",
          foreground: "#FFFFFF",
        },
        background: "#E0EDE9",
        foreground: "#06363D",
        surface: "#E0EDE9",
        card: {
          DEFAULT: "#FFFFFF",
          foreground: "#06363D",
        },
        popover: {
          DEFAULT: "#FFFFFF",
          foreground: "#06363D",
        },
        muted: {
          DEFAULT: "#84BABF",
          foreground: "#06363D",
        },
        destructive: {
          DEFAULT: "#0D6F73",
          foreground: "#FFFFFF",
        },
        border: "#84BABF",
        input: "#E0EDE9",
        ring: "#06363D",
      },
      boxShadow: {
        'teal-glow': '0 4px 14px 0 rgba(13,111,115,0.25)',
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-teal': 'linear-gradient(to bottom, #06363D, #0D6F73, #085558, #84BABF, #E0EDE9)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} 