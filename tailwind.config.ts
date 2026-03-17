import type { Config } from "tailwindcss";

const config: Config = {
    content: [
        "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
        "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    ],
    theme: {
        extend: {
            colors: {
                primary: "#F57C00", // Primary Orange
                secondary: "#FF9800", // Secondary Orange
                accent: "#E7A21A", // Accent Gold
                beige: "#F5E8D6", // Warm Beige Background
                dark: "#1A1A1A", // Dark Text
                neutral: "#F7F7F7", // Soft Neutral
            },
            fontFamily: {
                serif: ["var(--font-playfair)", "serif"],
                sans: ["var(--font-inter)", "sans-serif"],
                accent: ["var(--font-great-vibes)", "cursive"],
            },
            animation: {
                "fade-up": "fadeUp 0.5s ease-out forwards",
                "fade-in": "fadeIn 0.5s ease-out forwards",
                "zoom-in": "zoomIn 0.5s ease-out forwards",
            },
            keyframes: {
                fadeUp: {
                    "0%": { opacity: "0", transform: "translateY(20px)" },
                    "100%": { opacity: "1", transform: "translateY(0)" },
                },
                fadeIn: {
                    "0%": { opacity: "0" },
                    "100%": { opacity: "1" },
                },
                zoomIn: {
                    "0%": { opacity: "0", transform: "scale(0.95)" },
                    "100%": { opacity: "1", transform: "scale(1)" },
                },
            },
        },
    },
    plugins: [],
};
export default config;
