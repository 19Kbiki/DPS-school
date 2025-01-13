import React from 'react'
import "./home.scss"
import HeroSection from "./components/heroSection";
import AboutSection from "./components/aboutSection";
import ExperienceSection from "./components/experienceSection";
import LocationSection from "./components/locationSection";
import MidBanner from "./components/midBanner";
import ItinerarySection from "./components/itinerarySection";
import FAQSection from "./components/faqSection";

export default function Home() {
    return (
        <div>
            <HeroSection/>
            <AboutSection/>
            <ExperienceSection/>
            <LocationSection/>
            <MidBanner/>
            <ItinerarySection/>
            <FAQSection/>
        </div>
    )
}
