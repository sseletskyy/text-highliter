module.exports = {
  roots: ['./src'],
  transform: {
    '^.+\\.(tsx?|jsx?)$': 'babel-jest',
  },
  setupFilesAfterEnv: ["<rootDir>src/setupTests.js"],
  transformIgnorePatterns: ['node_modules/(?!ramda)'],
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
}
