"use client";

import { motion } from "framer-motion";
import { previewProjects } from "@/data/projects";
import { ProjectHeroBlock } from "@/components/projects/ProjectHeroBlock";

const motionProps = {
  initial: { opacity: 0, y: 16, filter: "blur(6px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.5, ease: "easeOut" },
  viewport: { amount: 0.4, once: false }
};

export function HomeProjectChapters() {
  return (
    <div className="snap-y snap-mandatory md:snap-mandatory">
      {previewProjects.map((project, index) => (
        <section key={project.slug} className="min-h-screen snap-start py-16 sm:py-20">
          <motion.div {...motionProps}>
            <ProjectHeroBlock project={project} variant="home" priorityImage={index === 0} />
          </motion.div>
        </section>
      ))}
    </div>
  );
}
