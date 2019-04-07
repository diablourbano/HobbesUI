module.exports = {
  presets: [
    'module:metro-react-native-babel-preset',
  ],
  plugins: [
    'babel-plugin-styled-components',
    '@babel/plugin-proposal-class-properties',
  ],
  env: {
    development: {
      plugins: [
        'babel-plugin-styled-components',
        '@babel/plugin-proposal-class-properties',
      ],
    },
  },
};
