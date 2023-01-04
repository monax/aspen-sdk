/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  webpack: (config, { isServer, webpack }) => {
    // FIXME: is there some way to polyfill the C/C++ NAPI modules 'bufferutil' and 'utf-8-validate' requires that
    //   cause require errors at build-time?
    return config;
  },
};

module.exports = nextConfig;
