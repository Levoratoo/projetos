"use client";

import { homeProjects } from "@/data/projects";
import { HomeHero } from "@/components/home/HomeHero";
import { AboutSection } from "@/components/home/AboutSection";
import { TimelineSection } from "@/components/home/TimelineSection";

export function SnapHome() {
  return (
    <div className="relative bg-black">
      <section id="home-hero" className="min-h-screen">
        <HomeHero />
      </section>
      <AboutSection />
      <TimelineSection projects={homeProjects} />
    </div>
  );
}
