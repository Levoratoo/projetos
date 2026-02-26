"use client";

import { createContext, useContext, useMemo, useState } from "react";

 type ProjectPreviewState = {
  activeSlug: string | null;
  isOpen: boolean;
  openPreview: (slug: string) => void;
  closePreview: () => void;
};

const ProjectPreviewContext = createContext<ProjectPreviewState | null>(null);

export function ProjectPreviewProvider({ children }: { children: React.ReactNode }) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);

  const value = useMemo<ProjectPreviewState>(
    () => ({
      activeSlug,
      isOpen: Boolean(activeSlug),
      openPreview: (slug: string) => setActiveSlug(slug),
      closePreview: () => setActiveSlug(null)
    }),
    [activeSlug]
  );

  return (
    <ProjectPreviewContext.Provider value={value}>
      {children}
    </ProjectPreviewContext.Provider>
  );
}

export function useProjectPreview() {
  const ctx = useContext(ProjectPreviewContext);
  if (!ctx) {
    throw new Error("useProjectPreview must be used within ProjectPreviewProvider");
  }
  return ctx;
}
