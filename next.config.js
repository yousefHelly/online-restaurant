/**
 * @type {import('next').NextConfig}
 */
module.exports = {
    experimental: {
      serverActions:true,
      optimizePackageImports: ['@mantine/core', '@mantine/hooks'],
    },
    swcMinify: true,
    productionBrowserSourceMaps: false, // Disable source maps in development
    optimizeFonts: false, // Disable font optimization
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'images.unsplash.com',
            port: '',
            pathname: '/**',
          },
          {
            protocol:'https',
            hostname:'lh3.googleusercontent.com',
            pathname: '/**',
          },
          {
            protocol:'https',
            hostname:'randomuser.me',
            pathname: '/**',
          },
          {
            protocol: 'https',
            hostname: 'localhost',
            port: '7166',
            pathname: '/Images/**',
          },
        ],
      },
}
