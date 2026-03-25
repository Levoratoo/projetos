/**
 * Build estático sem basePath para testar com `npx serve out` na raiz.
 * Com NEXT_PUBLIC_BASE_PATH (ex.: /projetos), o HTML referencia /projetos/_next/...
 * e um servidor na raiz de `out` só expõe /_next , o CSS 404.
 * O deploy no GitHub Actions define o base path no ambiente; lá está correto.
 */
import { spawnSync } from "node:child_process";

const env = {
  ...process.env,
  PREVIEW_STATIC_EXPORT: "1",
  NEXT_PUBLIC_BASE_PATH: "",
};
const r = spawnSync("npm", ["run", "build"], { stdio: "inherit", env, shell: true });
process.exit(r.status ?? 1);
