/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: 'images.igdb.com'
      },
      {
        hostname: 'gamers-pub-bucket.s3.us-east-1.amazonaws.com'
      }
    ]
  }
};

export default nextConfig;
