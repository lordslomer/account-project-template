const withPWA = require('next-pwa')({
  dest: 'public',
  cacheOnFrontEndNav: true,
  runtimeCaching: true,
  reloadOnOnline: true,
  disable: process.env.NODE_ENV === 'development',
  disableDevLogs: true,
  skipWaiting: true,
});
/** @type {import('next').NextConfig} */
const nextConfig = {};

module.exports = withPWA(nextConfig);
