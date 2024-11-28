/** @type {import("next").NextConfig} */
module.exports = {
  i18n: {
    defaultLocale: 'ru',
    locales: ['en', 'ru'],
  },
  images: {
    remotePatterns: [
      {
        hostname: 'storage.yandexcloud.net',
        pathname: '/incta-back/**',
        protocol: 'https',
      },
      {
        hostname: 'images.pexels.com',
      },
      { hostname: 'staging-it-incubator.s3.eu-central-1.amazonaws.com' },
    ],
  },
  reactStrictMode: true,
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find(rule => rule.test?.test?.('.svg'));

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        resourceQuery: /url/, // *.svg?url
        test: /\.svg$/i,
      },
      // Convert all other *.svg imports to React components
      {
        issuer: /\.[jt]sx?$/,
        resourceQuery: { not: /url/ }, // exclude if *.svg?url
        test: /\.svg$/i,
        use: ['@svgr/webpack'],
      }
    );

    /// Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
};
