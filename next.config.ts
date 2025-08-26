import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors. 
    //change this later
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;

//this is the file uses to customize and configure your next.js application

//for example, you might whitelist a domain from where you want next.js to load and optimze images


