"use client";

import React from "react";
import Link from "next/link";
import { Button } from "./ui/button";
import AnimatedContent from "./ui/Animations/AnimatedContent/AnimatedContent";

const HeroSection = () => {
  return (
    <section className="w-full pt-12 md:pt-16 pb-8 text-white">
      <div className="space-y-6 text-center container mx-auto px-4">
        {/* Headline */}
        <div className="space-y-6 hero-content">
          <div className="hero-title">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold leading-tight metallic-text">
              Welcome to WatshiBo
              <br />
              <span className="metallic-blue">
                Your Ultimate AI-Powered Study Companion
              </span>
            </h1>
          </div>
          <div className="hero-subtitle">
            <p className="mt-6 text-lg md:text-xl lg:text-2xl font-medium max-w-3xl mx-auto text-gray-100">
              Master interviews, craft standout resumes, and tailor cover letters.
              all powered by intelligent automation.
            </p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row justify-center gap-4 mb-10 hero-buttons">
          <AnimatedContent
            distance={200}
            direction="vertical"
            reverse={false}
            duration={0.8}
            ease="back.out"
            initialOpacity={0}
            animateOpacity
            scale={1.2}
            threshold={0}
            delay={0.2}
          >
            <Button 
              asChild 
              size="lg" 
              className="px-8 transition-all duration-300 hover:scale-110 hover:shadow-2xl"
            >
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </AnimatedContent>
          <AnimatedContent
            distance={200}
            direction="vertical"
            reverse={false}
            duration={0.8}
            ease="back.out"
            initialOpacity={0}
            animateOpacity
            scale={1.2}
            threshold={0}
            delay={0.4}
          >
            <Button 
              asChild 
              size="lg" 
              className="px-8 transition-all duration-300 hover:scale-110 hover:shadow-2xl" 
              variant="outline"
            >
              <Link href="/dashboard">Learn More</Link>
            </Button>
          </AnimatedContent>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
