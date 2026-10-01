import type { NextConfig } from "next"

const nextConfig: NextConfig = {
  async redirects() {
    return [
      {
        source: "/link-inspector",
        destination: "/backlink-inspector",
        permanent: true,
      },
    ]
  },
}

export default nextConfig
