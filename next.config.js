/** @type {import('next').NextConfig} */

// Set to your repo name for GitHub Pages deployment
const repoName = process.env.GITHUB_PAGES === 'true' ? '/splash' : ''

const nextConfig = {
  output: 'export',
  basePath: repoName,
  assetPrefix: repoName,
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
}

module.exports = nextConfig
