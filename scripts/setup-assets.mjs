import https from "https";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const root = path.resolve(__dirname, "..");

const targets = [
  {
    name: "HDRI Studio 1K",
    url: "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/pav_studio_01_1k.hdr",
    dest: path.join(root, "public", "hdr", "studio_1k.hdr")
  },
  {
    name: "HDRI City 1K",
    url: "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/wide_street_01_1k.hdr",
    dest: path.join(root, "public", "hdr", "city_1k.hdr")
  },
  {
    name: "HDRI Interior 1K",
    url: "https://dl.polyhaven.org/file/ph-assets/HDRIs/hdr/1k/indoor_garage_01_1k.hdr",
    dest: path.join(root, "public", "hdr", "interior_1k.hdr")
  },
  {
    name: "Noise Texture",
    url: "https://upload.wikimedia.org/wikipedia/commons/2/2c/Noise.png",
    dest: path.join(root, "public", "textures", "noise.png")
  },
  {
    name: "Lens Dirt Texture",
    url: "https://upload.wikimedia.org/wikipedia/commons/3/3f/Camera_lens_dirt.png",
    dest: path.join(root, "public", "textures", "lens_dirt.png")
  }
];

const ensureDirs = [
  path.join(root, "public", "hdr"),
  path.join(root, "public", "textures"),
  path.join(root, "public", "projects"),
  path.join(root, "public", "projects", "_placeholders"),
  path.join(root, "public", "video"),
  path.join(root, "scripts")
];

for (const dir of ensureDirs) {
  fs.mkdirSync(dir, { recursive: true });
}

function downloadFile(url, dest) {
  return new Promise((resolve) => {
    if (fs.existsSync(dest)) {
      resolve({ dest, url, status: "skipped" });
      return;
    }

    const file = fs.createWriteStream(dest);
    const request = https.get(
      url,
      {
        headers: {
          "User-Agent": "printbag-showcase-asset-setup"
        }
      },
      (response) => {
        if (response.statusCode && response.statusCode >= 400) {
          file.close();
          if (fs.existsSync(dest)) fs.unlinkSync(dest);
          resolve({ dest, url, status: `failed (${response.statusCode})` });
          return;
        }

        const total = Number(response.headers["content-length"]) || 0;
        let downloaded = 0;

        response.on("data", (chunk) => {
          downloaded += chunk.length;
          if (total) {
            const pct = Math.floor((downloaded / total) * 100);
            process.stdout.write(`\r${path.basename(dest)} ${pct}%`);
          }
        });

        response.pipe(file);

        file.on("finish", () => {
          file.close(() => {
            process.stdout.write("\n");
            resolve({ dest, url, status: "ok" });
          });
        });
      }
    );

    request.on("error", (err) => {
      file.close();
      if (fs.existsSync(dest)) fs.unlinkSync(dest);
      resolve({ dest, url, status: `failed (${err.message})` });
    });
  });
}

async function run() {
  const results = [];

  for (const item of targets) {
    console.log(`Downloading: ${item.name}`);
    const result = await downloadFile(item.url, item.dest);
    results.push({ ...item, ...result });
  }

  console.log("\nDownload report:");
  const ok = results.filter((r) => r.status === "ok" || r.status === "skipped");
  const failed = results.filter((r) => r.status.startsWith("failed"));
  ok.forEach((r) =>
    console.log(`✔ ${r.name} -> ${path.relative(root, r.dest)} (${r.status})`)
  );
  failed.forEach((r) =>
    console.log(`✖ ${r.name} -> ${r.url} (${r.status})`)
  );

  if (failed.length) {
    process.exitCode = 1;
  }
}

run();
