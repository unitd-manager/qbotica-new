/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Image optimization
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dev.srv975395.hstgr.cloud',
        port: '', // leave empty for default ports
        pathname: '/**',
      },
 {
      protocol: 'https',
      hostname: 'qbadevadmin.unitdtechnologies.com',
      port: '', // leave empty for default ports syed
      pathname: '/**',
    },


       {
      protocol: 'https',
      hostname: 'qbwpadmin.unitdtechnologies.com',
      port: '', // leave empty for default ports syed
      pathname: '/**',
    }
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
  },

  // Compiler optimizations
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn'],
    } : false,
  },

  // Headers for caching and security
  async headers() {
    return [
      {
        source: '/:all*(svg|jpg|jpeg|png|gif|ico|webp|avif)',
        locale: false,
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'geolocation=(), microphone=()',
          },
        ],
      },
    ];
  },

  // Production source maps - disable for better performance
  productionBrowserSourceMaps: false,

  // Compression
  compress: true,

  // Power off x-powered-by header
  poweredByHeader: false,

  // Webpack optimizations
  webpack: (config, { isServer }) => {
    // Ensure optimization and splitChunks objects exist before mutating
    config.optimization = config.optimization || {};
    config.optimization.splitChunks = config.optimization.splitChunks || {};
    config.optimization.splitChunks.cacheGroups = {
      ...(config.optimization.splitChunks.cacheGroups || {}),
      // Separate vendor chunks
      bootstrap: {
        test: /[\\/]node_modules[\\/](bootstrap|react-bootstrap)[\\/]/,
        name: 'bootstrap',
        priority: 10,
        reuseExistingChunk: true,
      },
      slick: {
        test: /[\\/]node_modules[\\/](slick-carousel|react-slick)[\\/]/,
        name: 'slick',
        priority: 10,
        reuseExistingChunk: true,
      },
      antd: {
        test: /[\\/]node_modules[\\/]antd[\\/]/,
        name: 'antd',
        priority: 10,
        reuseExistingChunk: true,
      },
      common: {
        minChunks: 2,
        priority: 5,
        reuseExistingChunk: true,
      },
    };
    return config;
  },
};

export default nextConfig;