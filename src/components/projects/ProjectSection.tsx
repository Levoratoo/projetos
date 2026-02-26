"use client";

import { forwardRef } from "react";
import { motion } from "framer-motion";
import { type PreviewProject } from "@/data/projects";
import { Container } from "@/components/Container";
import { ProjectHeroBlock } from "@/components/projects/ProjectHeroBlock";

const motionProps = {
  initial: { opacity: 0, y: 18, filter: "blur(6px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.5, ease: "easeOut" },
  viewport: { amount: 0.4, once: false }
};

type ProjectSectionProps = {
  project: PreviewProject;
  id?: string;
  priorityImage?: boolean;
};

export const ProjectSection = forwardRef<HTMLElement, ProjectSectionProps>(
  ({ project, id, priorityImage = false }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        className="relative flex min-h-[80vh] items-center snap-start py-8 sm:py-10 lg:min-h-[85vh] lg:py-12"
      >
        <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(20,34,28,0.6),_transparent_60%),radial-gradient(circle_at_20%_80%,_rgba(16,26,22,0.55),_transparent_55%)]" />
        <div className="pointer-events-none absolute inset-0 -z-10 opacity-[0.18] [background-image:url('data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%27120%27 height=%27120%27 viewBox=%270 0 120 120%27%3E%3Cfilter id=%27n%27%3E%3CfeTurbulence type=%27fractalNoise%27 baseFrequency=%270.8%27 numOctaves=%272%27 stitchTiles=%27stitch%27/%3E%3C/filter%3E%3Crect width=%27120%27 height=%27120%27 filter=%27url(%23n)%27 opacity=%270.5%27/%3E%3C/svg%3E')]" />
        <div className="pointer-events-none absolute inset-0 -z-10 shadow-[inset_0_0_140px_rgba(0,0,0,0.7)]" />

        <Container className="max-w-[1200px] xl:max-w-[1320px] 2xl:max-w-[1440px]">
          <motion.div {...motionProps}>
            <ProjectHeroBlock
              project={project}
              variant="home"
              priorityImage={priorityImage}
            />
          </motion.div>
        </Container>
      </section>
    );
  }
);

ProjectSection.displayName = "ProjectSection";
