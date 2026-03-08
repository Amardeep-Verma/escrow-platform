/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Plus Jakarta Sans",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "sans-serif",
        ],
      },

      colors: {
        brand: {
          50:  "#eef2ff",
          100: "#e0e7ff",
          400: "#818cf8",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
        },
        surface: {
          0: "#020617",
          1: "#0a1628",
          2: "#0d1b30",
          3: "#111c2e",
        },
      },

      fontSize: {
        display: ["40px", { lineHeight: "48px", fontWeight: "600" }],
        h1: ["28px", { lineHeight: "36px", fontWeight: "600" }],
        h2: ["22px", { lineHeight: "30px", fontWeight: "600" }],
        h3: ["18px", { lineHeight: "26px", fontWeight: "500" }],
        body: ["15px", { lineHeight: "24px", fontWeight: "400" }],
        label: ["13px", { lineHeight: "18px", fontWeight: "500" }],
        tiny: ["11px", { lineHeight: "16px", fontWeight: "500" }],
      },

      letterSpacing: {
        tightest: "-0.03em",
        tighter:  "-0.02em",
        wide4:    "0.04em",
        wide6:    "0.06em",
        wide8:    "0.08em",
      },

      boxShadow: {
        card:      "0 1px 3px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.06)",
        "card-hover": "0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.35), 0 0 24px rgba(99,102,241,0.12)",
        glow:      "0 0 40px rgba(99,102,241,0.25)",
        "glow-sm": "0 0 16px rgba(99,102,241,0.2)",
      },

      backdropBlur: {
        xl2: "28px",
      },

      keyframes: {
        "fade-in": {
          from: { opacity: "0", transform: "translateY(8px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-16px)" },
          to:   { opacity: "1", transform: "translateX(0)" },
        },
        "pulse-slow": {
          "0%, 100%": { opacity: "0.4" },
          "50%":      { opacity: "0.7" },
        },
      },
      animation: {
        "fade-in":       "fade-in 0.4s ease both",
        "slide-in-left": "slide-in-left 0.35s ease both",
        "pulse-slow":    "pulse-slow 4s ease-in-out infinite",
        pulseSlow:       "pulse-slow 4s ease-in-out infinite",
      },
    },
  },

  plugins: [],
};
