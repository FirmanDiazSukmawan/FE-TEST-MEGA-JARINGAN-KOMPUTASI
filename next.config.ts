import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['res.cloudinary.com'],
  },
  experimental: {
    optimizeCss: false,
  },
  async rewrites() {
    return [
      {
        source: '/backend/',  
        destination: `${process.env.NEXT_PUBLIC_BASE_URL}/`, 
      },
    ];
  },
};

export default nextConfig;
