import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const localNodeModules = path.join(__dirname, "node_modules");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // When a parent folder (e.g. OneDrive\Documents) is mistaken for the app root,
  // PostCSS / TailCSS resolution can walk up and fail to find `tailwindcss`.
  turbopack: {
    root: __dirname,
  },
  webpack: (config) => {
    config.context = __dirname;
    config.resolve.modules = [
      localNodeModules,
      ...(Array.isArray(config.resolve.modules) ? config.resolve.modules : []),
    ];
    return config;
  },
};

export default nextConfig;
