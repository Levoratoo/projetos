/** @type {import('next').NextConfig} */
/**
 * GitHub Pages (projeto): `NEXT_PUBLIC_BASE_PATH` deve ser `/<nome-do-repo>` no build.
 * Sem isso, o HTML aponta para `/_next/...` mas o site vive em `/<repo>/...` e o CSS 404.
 * O Jekyll do GitHub ignora pastas `_`; use `public/.nojekyll` (copiado para `out/`).
 * Para testar localmente `npx serve out` na raiz, use `npm run build:preview` (sem basePath).
 */
const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const repoName = process.env.GITHUB_REPOSITORY?.split("/")[1];
/** Export estático para `npx serve out` na raiz (sem segmento /repo). Ignora .env.local basePath. */
const previewStaticExport = process.env.PREVIEW_STATIC_EXPORT === "1";
const basePath = previewStaticExport
  ? ""
  : process.env.NEXT_PUBLIC_BASE_PATH ||
    (isGithubActions && repoName ? `/${repoName}` : "");

const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  basePath,
  assetPrefix: basePath || undefined,
  images: {
    unoptimized: true
  }
};

export default nextConfig;
