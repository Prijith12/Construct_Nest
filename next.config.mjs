/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https",
          hostname: "yvihkbfh9232cvoj.public.blob.vercel-storage.com",
        },
      ],
    },
  };
  
export default nextConfig;
  