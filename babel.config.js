const presets = [
  [
    '@babel/preset-env',
    {
      targets: {
        node: 'current',
      },
    },
  ],
  '@babel/preset-typescript',
  [
    '@babel/preset-react',
    {
      runtime: 'automatic',
    },
  ],
];

module.exports = {
  presets: presets,
  plugins: [],
};
