/** @type {import('next').NextConfig} */
const nextConfig = {
  // REQUIRED for Docker deployment
  output: 'standalone',
  
  // Recommended: Strict mode for better error checking
  reactStrictMode: true,
  
  // Optional: Reduce build output
  swcMinify: true,
  
  // Add any other Next.js configuration options you need
  // Examples:
  
  // images: {
  //   domains: ['your-image-domain.com'],
  // },
  
  // env: {
  //   CUSTOM_VAR: process.env.CUSTOM_VAR,
  // },
}

module.exports = nextConfig

// INSTRUCTIONS:
// 1. If you don't have a next.config.js file, create one with this content
// 2. If you already have next.config.js, just add the line: output: 'standalone',
// 3. This is REQUIRED for Docker builds to work properly

