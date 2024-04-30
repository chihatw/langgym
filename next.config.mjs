/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      { hostname: '127.0.0.1' },
      { hostname: 'ifhrlwhlgpgzpmwdonjo.supabase.co' },
    ],
  },
};

export default nextConfig;
