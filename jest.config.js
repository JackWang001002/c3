
/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
const config = {
  verbose: true,

  transform: { '\\.[jt]sx?$': 'babel-jest' },
  testRegex: '(\\.test)\\.(jsx?|tsx?|mjs)$',
  transformIgnorePatterns: [],

  testEnvironment: 'node',
  onlyChanged: true,

  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'lcov', 'text'],
  watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/.git/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'mjs'],
  rootDir: __dirname,
};

module.exports = config;
