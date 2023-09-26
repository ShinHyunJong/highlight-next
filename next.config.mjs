/* eslint-disable import/no-extraneous-dependencies, import/extensions */

import withBundleAnalyzer from '@next/bundle-analyzer';
import withPWA from 'next-pwa';
import withPlugins from 'next-compose-plugins';

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
});

const nextConfig = {
  eslint: {
    dirs: ['.'],
    ignoreDuringBuilds: true,
  },

  poweredByHeader: false,
  basePath: '',
  // The starter code load resources from `public` folder with `router.basePath` in React components.
  // So, the source code is "basePath-ready".
  // You can remove `basePath` if you don't need it.
  reactStrictMode: true,
  webpack: (config) => {
    // config.externals is needed to resolve the following errors:
    // Module not found: Can't resolve 'bufferutil'
    // Module not found: Can't resolve 'utf-8-validate'
    config.externals.push({
      bufferutil: 'bufferutil',
      'utf-8-validate': 'utf-8-validate',
    });

    return config;
  },
  images: {
    domains: [
      'p.scdn.co',
      'i.scdn.co',
      'assets.discoverrealmusic.com',
      'is1-ssl.mzstatic.com',
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default withPlugins(
  [
    [bundleAnalyzer],
    [
      withPWA({
        dest: 'public',
        register: true,
        skipWaiting: true,
      }),
    ],
  ],
  nextConfig,
);
