/** @type {import('next').NextConfig} */

// Set to your repo name for GitHub Pages deployment
// Automatically detect from GitHub environment or use manual setting
function getBasePath() {
  // If GITHUB_PAGES is set, use the repository name
  if (process.env.GITHUB_PAGES === 'true') {
    // Try to get from GitHub environment variables first
    const repoName = process.env.GITHUB_REPOSITORY?.split('/')[1] || 'splash'
    return `/${repoName}`
  }
  return ''
}

const repoName = getBasePath()

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
