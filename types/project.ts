export type Project = {
  slug: string;
  title: string;
  excerpt: string;
  description: string;
  year: number;
  segment: string;
  tags: string[];
  stack: string[];
  kpis: {
    label: string;
    value: string;
  }[];
  cover: {
    hue: number;
    title: string;
  };
  challenge: string;
  solution: string;
  results: string[];
  gallery: {
    hue: number;
    label: string;
  }[];
};
