"use client";

import { ProjectPreviewProvider } from "@/state/projectPreview";

export function Providers({ children }: { children: React.ReactNode }) {
  return <ProjectPreviewProvider>{children}</ProjectPreviewProvider>;
}
