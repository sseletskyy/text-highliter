module.exports = {
  '*.{ts,tsx,js,jsx}': filenames => (
    filenames.length > 10
      ? 'npm run eslint:fix'
      : `eslint --fix ${filenames.join(' ')}`
  )
}
