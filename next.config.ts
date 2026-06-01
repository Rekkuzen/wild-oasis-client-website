import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "oldqdyydbrjlmchvfxkf.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/cabin-images/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname: "/a/**",
      }
    ],
  },
};
// (https://lh3.googleusercontent.com/a/ACg8ocIkBSdR4bKl6IfNHIa1Xw8TfIEU8KOfXmEYtmPm3AwiEfvSptdw=s96-c)
export default nextConfig;
