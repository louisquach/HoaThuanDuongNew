/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "standalone",
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
    ],
  },
  sassOptions: {
    silenceDeprecations: ['legacy-js-api'],
  },
  eslint: {
    // Re-enable once eslint-config-next version is aligned
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
