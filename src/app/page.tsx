"use client";

import Navbar from "@/components/Navbar";
import HeroSlider from "@/components/HeroSlider";
import CultureBanner from "@/components/CultureBanner";
import StorySplit from "@/components/StorySplit";
import DishGrid from "@/components/DishGrid";
import TestimonialCarousel from "@/components/TestimonialCarousel";
import BookingCTA from "@/components/BookingCTA";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";

export default function Home() {
    return (
        <main className="min-h-screen">
            <Navbar />
            <HeroSlider />
            <CultureBanner />
            <StorySplit />
            <DishGrid />
            <TestimonialCarousel />
            <BookingCTA />
            <ContactSection />
            <Footer />
            <FloatingActions />
        </main>
    );
}
