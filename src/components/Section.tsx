import { ReactNode } from "react";
import { Container } from "@/components/Container";

type SectionProps = {
  id?: string;
  eyebrow?: string;
  title: string;
  description?: string;
  children: ReactNode;
};

export function Section({ id, eyebrow, title, description, children }: SectionProps) {
  return (
    <section id={id} className="py-16 sm:py-24">
      <Container>
        <div className="mb-10 max-w-2xl">
          {eyebrow ? (
            <p className="text-xs uppercase tracking-[0.35em] text-glow/80">
              {eyebrow}
            </p>
          ) : null}
          <h2 className="mt-3 font-display text-3xl font-semibold text-white sm:text-4xl">
            {title}
          </h2>
          {description ? (
            <p className="mt-3 text-sm leading-relaxed text-mist/80 sm:text-base">
              {description}
            </p>
          ) : null}
        </div>
        {children}
      </Container>
    </section>
  );
}
