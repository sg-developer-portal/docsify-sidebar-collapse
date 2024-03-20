module.exports = {
    branches: ['fix-hide-sidebar'], // Set the branch you want to release from
    plugins: [
      '@semantic-release/commit-analyzer', // Analyzes commit messages to determine the release type
      '@semantic-release/release-notes-generator', // Generates release notes
      '@semantic-release/github', // Publishes releases to GitHub
      '@semantic-release/npm', // Publishes packages to npm
      [
        '@semantic-release/git', // Commits changes to package.json and CHANGELOG.md
        {
          assets: ['package.json', 'CHANGELOG.md'],
          message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
        },
      ],
    ],
  };