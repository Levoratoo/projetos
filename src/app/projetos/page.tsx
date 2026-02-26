import type { Metadata } from "next";
import ProjectsPage from "@/components/ProjectsPage";

export const metadata: Metadata = {
  title: "Projetos | Printbag",
  description: "Lista completa de cases técnicos e integrações realizadas."
};

export default function Page() {
  return <ProjectsPage />;
}
