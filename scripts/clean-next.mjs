/**
 * Remove cache de build do Next/Webpack (evita erros tipo:
 * "Cannot find module './682.js'" ou "./vendor-chunks/tailwind-merge.js").
 * Uso: npm run clean && npm run dev
 */
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, "..");

const toRemove = [
  ".next",
  ".turbo",
  path.join("node_modules", ".cache")
];

for (const rel of toRemove) {
  const target = path.join(root, rel);
  try {
    fs.rmSync(target, { recursive: true, force: true });
    console.log("[clean-next] removido:", rel);
  } catch {
    // ignora se não existir
  }
}

console.log("[clean-next] Pronto. Rode: npm run dev");
