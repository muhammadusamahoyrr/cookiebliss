/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['randomuser.me'], // Add any external domains for images here
  },
  experimental: {
    optimizeCss: true,
  },
};

module.exports = nextConfig;