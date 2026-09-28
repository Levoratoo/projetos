"use client";

import { homeProjects } from "@/data/projects";
import { HomeHero } from "@/components/home/HomeHero";
import { AboutSection } from "@/components/home/AboutSection";
import { FeaturedProjectSection } from "@/components/home/FeaturedProjectSection";
import { TimelineSection } from "@/components/home/TimelineSection";

const FEATURED_SLUG = "musefy";

export function SnapHome() {
  const catalogProjects = homeProjects.filter(
    (project) => project.slug !== FEATURED_SLUG
  );

  return (
    <div className="relative bg-black">
      <section id="home-hero" className="min-h-screen">
        <HomeHero />
      </section>
      <AboutSection />
      <FeaturedProjectSection />
      <TimelineSection projects={catalogProjects} />
    </div>
  );
}
