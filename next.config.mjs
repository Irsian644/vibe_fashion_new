/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // WebP only. AVIF encodes ~10× slower on the first (uncached) request, which
    // made the homepage feel slow on a cold visit while ~14 images encoded at once.
    // WebP gives near-identical file sizes with a fast cold encode.
    formats: ["image/webp"],
    // Keep optimized variants cached far longer so repeat visits never re-encode.
    minimumCacheTTL: 60 * 60 * 24 * 31, // 31 days
    remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }],
  },
};

export default nextConfig;
