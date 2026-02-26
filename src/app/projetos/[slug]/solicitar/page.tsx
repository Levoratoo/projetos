import { notFound } from "next/navigation";
import { projects } from "@/data/projects";
import { Container } from "@/components/Container";
import { RequestPageContent } from "@/components/case/RequestPageContent";

type PageProps = {
  params: { slug: string };
};

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default function RequestPage({ params }: PageProps) {
  const project = projects.find((item) => item.slug === params.slug);
  if (!project) {
    notFound();
  }

  const dashboardUrl =
    project.slug === "dashboard-separacao-estoque"
      ? "http://192.168.1.104:3002/dashboard"
      : "";

  const projectInfo = {
    nomeProjeto: project.title,
    tags: project.tags,
    urlProjeto: `/projetos/${project.slug}`
  };

  return (
    <main className="relative py-12 sm:py-16">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-[radial-gradient(circle_at_top,_rgba(20,34,28,0.55),_transparent_60%),radial-gradient(circle_at_20%_80%,_rgba(18,28,24,0.45),_transparent_55%)]" />
      <Container>
        <RequestPageContent project={projectInfo} dashboardUrl={dashboardUrl} />
      </Container>
    </main>
  );
}
