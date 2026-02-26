const rawBasePath = process.env.NEXT_PUBLIC_BASE_PATH || "";

const normalizedBasePath =
  rawBasePath && rawBasePath !== "/"
    ? rawBasePath.startsWith("/")
      ? rawBasePath.replace(/\/+$/, "")
      : `/${rawBasePath.replace(/\/+$/, "")}`
    : "";

export function withBasePath(path: string): string {
  if (!path) return path;
  if (/^(?:https?:)?\/\//.test(path) || path.startsWith("data:")) {
    return path;
  }
  if (!path.startsWith("/")) {
    return path;
  }
  if (!normalizedBasePath) {
    return path;
  }
  if (path === normalizedBasePath || path.startsWith(`${normalizedBasePath}/`)) {
    return path;
  }
  return `${normalizedBasePath}${path}`;
}

export function getBasePath(): string {
  return normalizedBasePath;
}
