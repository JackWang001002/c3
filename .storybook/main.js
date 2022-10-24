const glob = require('glob');
const path = require('path');

const getStories = () =>
  glob.sync(`packages/**/*.stories.@(js|jsx|ts|tsx|mdx)`, {
    ignore: `packages/**/node_modules/**/*.stories.@(js|jsx|ts|tsx|mdx)`,
  });
module.exports = {
  stories: async list => [...getStories().map(e => `../${e}`)],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
};
