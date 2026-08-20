import type { NextConfig } from "next";

const sitesAssetOrigin = "https://hato-beauty-studio.nttthao261096.chatgpt.site";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
  },
  typescript: {
    tsconfigPath: "tsconfig.vercel.json",
  },
  ...(process.env.VERCEL
    ? {
        async rewrites() {
          return [
            { source: "/video/:path*", destination: `${sitesAssetOrigin}/video/:path*` },
            { source: "/images/:path*", destination: `${sitesAssetOrigin}/images/:path*` },
            { source: "/brand/:path*", destination: `${sitesAssetOrigin}/brand/:path*` },
            { source: "/:asset(favicon\\.svg|file\\.svg|globe\\.svg|window\\.svg|og\\.png|og-v2\\.png|og-shine\\.png)", destination: `${sitesAssetOrigin}/:asset` },
          ];
        },
      }
    : {}),
};

export default nextConfig;
