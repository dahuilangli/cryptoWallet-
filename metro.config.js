/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
 const crypto = require.resolve('react-native-crypto');
 
module.exports = {
  resolver: {
    extraNodeModules: {
      crypto,
      // fs: require.resolve('expo-file-system'),
      // http: require.resolve('stream-http'),
      // https: require.resolve('https-browserify'),
      // net: require.resolve('react-native-tcp'),
      // os: require.resolve('os-browserify/browser.js'),
      // path: require.resolve('path-browserify'),
      stream: require.resolve('readable-stream'),
      // buffer: require.resolve('buffer'),
      // vm: require.resolve('vm-browserify'),
    },
  },
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: false,
      },
    }),
  },
};
