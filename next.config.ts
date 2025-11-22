import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Asset prefix for production (optional - only if using CDN)
  assetPrefix: process.env.NEXT_PUBLIC_MAIN_ASSET_PREFIX,
  
  async rewrites() {
    return [
      {
        source: "/blog",
        destination: process.env.NEXT_PUBLIC_BLOG_URL || "http://localhost:3001/blog",
      },
      {
        source: "/blog/:path*",
        destination: process.env.NEXT_PUBLIC_BLOG_URL 
          ? `${process.env.NEXT_PUBLIC_BLOG_URL}/:path*`
          : "http://localhost:3001/blog/:path*",
      },
    ];
  },
};

export default nextConfig;
