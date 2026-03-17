"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

export default function CultureBanner() {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"],
    });

    const x = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

    return (
        <section
            ref={containerRef}
            className="relative h-[250px] md:h-[350px] lg:h-[450px] bg-[#F5E8D6] overflow-hidden flex items-center"
        >
            {/* Horizontal Line Art Illustration with Parallax */}
            <motion.div
                style={{ x }}
                className="absolute inset-0 whitespace-nowrap flex items-center opacity-70 pointer-events-none"
            >
                <div className="relative h-full w-[200%] flex items-center justify-around px-20">
                    <svg
                        viewBox="0 0 2000 400"
                        className="w-full h-auto text-dark/20 stroke-current fill-none stroke-[0.5]"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        {/* Simplified Line Art Representation of South Indian Culture */}
                        {/* Temples */}
                        <path d="M100 350 L100 200 L200 100 L300 200 L300 350 Z" />
                        <path d="M150 150 L250 150 M200 100 L200 350" />

                        {/* Elephants */}
                        <circle cx="500" cy="250" r="50" />
                        <path d="M450 250 L400 300 L400 350 M550 250 L600 300 L600 350" />
                        <path d="M500 200 Q500 150 550 150" />

                        {/* Dancers */}
                        <path d="M800 350 L800 250 L750 200 M800 250 L850 200 M800 250 L800 200" />
                        <circle cx="800" cy="180" r="15" />

                        {/* Architectural Buildings */}
                        <path d="M1100 350 L1100 150 L1200 100 L1300 150 L1300 350 Z" />
                        <path d="M1150 200 L1250 200" />

                        {/* More Temples/Icons */}
                        <path d="M1500 350 L1500 200 L1600 100 L1700 200 L1700 350 Z" />
                        <path d="M1550 150 L1650 150" />

                        <path d="M1850 350 L1850 250 L1800 200 M1850 250 L1900 200" />
                        <circle cx="1850" cy="180" r="15" />
                    </svg>

                    {/* Repeating the SVG for seamless look during parallax if needed, 
                        but here we just use a wider viewbox for demonstration */}
                </div>
            </motion.div>

            {/* Optional Overlay Text or Subtle Vignette */}
            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-[#F5E8D6] via-transparent to-[#F5E8D6] opacity-30" />
        </section>
    );
}
