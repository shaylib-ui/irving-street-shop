/** @type {import('next').NextConfig} */
const nextConfig = {
  // Backend API URL — override with NEXT_PUBLIC_API_URL env var in production
  env: {
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001",
  },
  images: {
    // Add allowed CJ Affiliate image domains here as needed
    remotePatterns: [],
  },
};

export default nextConfig;
