import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  async rewrites() {
    return [
      {
        source: "/uploadfile/:path*",
        destination:
          "/sites/www-cqcpe-cn-ccd5d01f/cms/uploadfile/:path*",
      },
      {
        source: "/static/default/web/img/:path*",
        destination:
          "/sites/www-cqcpe-cn-ccd5d01f/shared/images/:path*",
      },
      {
        source: "/static/default/images/:path*",
        destination:
          "/sites/www-cqcpe-cn-ccd5d01f/shared/images/:path*",
      },
      {
        source: "/static/default/:path*",
        destination:
          "/sites/www-cqcpe-cn-ccd5d01f/cms/static/default/:path*",
      },
    ];
  },
};

export default nextConfig;
