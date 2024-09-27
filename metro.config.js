/* eslint-disable @typescript-eslint/no-require-imports */
const path = require("path");

const { getDefaultConfig } = require("expo/metro-config");

module.exports = (() => {
  const dirname = path.resolve();
  const config = getDefaultConfig(dirname);

  const { transformer, resolver } = config;

  config.transformer = {
    ...transformer,
    babelTransformerPath: require.resolve("react-native-svg-transformer"),
  };
  config.resolver = {
    ...resolver,
    assetExts: resolver.assetExts.filter((ext) => ext !== "svg"),
    sourceExts: [...resolver.sourceExts, "svg"],
  };

  return config;
})();
