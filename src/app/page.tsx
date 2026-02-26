"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { ProjectPreviewModal } from "@/components/ProjectPreviewModal";
import { useProjectPreview } from "@/state/projectPreview";
import { SnapHome } from "@/components/home/SnapHome";

function HomeContent() {
  const { activeSlug, isOpen, closePreview } = useProjectPreview();
  const pathname = usePathname();

  useEffect(() => {
    if (pathname !== "/") {
      closePreview();
    }
  }, [pathname, closePreview]);

  return (
    <main className="bg-[#0b0f0c]">
      <SnapHome />
      <ProjectPreviewModal open={isOpen} slug={activeSlug} onClose={closePreview} />
    </main>
  );
}

export default function HomePage() {
  return <HomeContent />;
}
