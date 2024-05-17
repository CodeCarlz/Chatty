/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "16.171.25.179",
        port: "5000",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "chatty.evileyedev.in",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "chatty.evileyedev.in",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
        port: "",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "chatty-backend.evileyedev.in",
        port: "5000",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "chatty-backend.evileyedev.in",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
