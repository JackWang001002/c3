const presets = [
  [
    "@babel/preset-env",
    {
      targets: {
        node: "current",
      },
    },
  ],
  "@babel/preset-typescript",
  "@babel/preset-react",
];

module.exports = {
  presets: presets,
  plugins: [],
};
