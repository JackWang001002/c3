
/**
 * @type {import('@jest/types').Config.InitialOptions}
 */
const config = {
  verbose: true,

  transform: {
    '(\\.test)\\.(jsx?|tsx?|mjs)$': 'babel-jest',
  },
  testRegex: '(\\.test)\\.(jsx?|tsx?|mjs)$',
  transformIgnorePatterns: [],
  moduleNameMapper: {
    // '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
    // '<rootDir>/__mocks__/fileMock.js',
    // '\\.(css|less)$': '<rootDir>/__mocks__/styleMock.js',
    // setupFilesAfterEnv: ['jest-extended'],
  },
  // setupFilesAfterEnv: ['<rootDir>/jestSetupTests.js'],
  // testEnvironment: 'jsdom',

  coverageDirectory: 'coverage',
  coverageReporters: ['html', 'lcov', 'text'],
  watchPathIgnorePatterns: ['/node_modules/', '/dist/', '/.git/'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json'],
  rootDir: __dirname,
};

module.exports = config;
