import type { Metadata } from "next";
import { Inter, Playfair_Display, Great_Vibes } from "next/font/google";
import "./globals.css";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

const playfair = Playfair_Display({
    subsets: ["latin"],
    variable: "--font-playfair",
});

const greatVibes = Great_Vibes({
    weight: "400",
    subsets: ["latin"],
    variable: "--font-great-vibes",
});

export const metadata: Metadata = {
    title: "DosaBar | Authentic South Indian Cuisine",
    description: "Experience the rich aromatic flavours of South India from crispy dosas to steaming idlis.",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" className={`${inter.variable} ${playfair.variable} ${greatVibes.variable}`}>
            <body className="font-sans bg-beige text-dark antialiased">
                {children}
            </body>
        </html>
    );
}
