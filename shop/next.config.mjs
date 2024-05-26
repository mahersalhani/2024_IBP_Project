import withNextIntlPlugin from 'next-intl/plugin';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [{ hostname: '*.cloudfront.net' }, { hostname: '*.googleusercontent.com' }],
  },
  transpilePackages: ['@shoppy/api-client'],
  output: 'standalone',
};

export default withNextIntlPlugin()(nextConfig);
