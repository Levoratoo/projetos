"use client";

import { forwardRef } from "react";
import { type PreviewProject } from "@/data/projects";
import { HomeCosmicBackdrop } from "@/components/home/HomeCosmicBackdrop";
import { Container } from "@/components/Container";
import { ProjectHeroBlock } from "@/components/projects/ProjectHeroBlock";
import { cn } from "@/lib/utils";

type ProjectSectionProps = {
  project: PreviewProject;
  id?: string;
  priorityImage?: boolean;
  /** Classes extras na section (ex.: primeiro card após o hero) */
  sectionClassName?: string;
};

export const ProjectSection = forwardRef<HTMLElement, ProjectSectionProps>(
  ({ project, id, priorityImage = false, sectionClassName }, ref) => {
    return (
      <section
        ref={ref}
        id={id}
        className={cn(
          "relative flex min-h-[80vh] items-center overflow-hidden bg-black snap-start py-8 sm:py-10 lg:min-h-[85vh] lg:py-12",
          sectionClassName
        )}
      >
        <HomeCosmicBackdrop />

        <Container className="relative z-10 max-w-[1200px] xl:max-w-[1320px] 2xl:max-w-[1440px]">
          {/* Sem whileInView: com snap/overflow no layout o IO não disparava e opacity ficava 0 */}
          <ProjectHeroBlock
            project={project}
            variant="home"
            priorityImage={priorityImage}
          />
        </Container>
      </section>
    );
  }
);

ProjectSection.displayName = "ProjectSection";
