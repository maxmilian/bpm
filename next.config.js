const withLess = require('next-with-less');

module.exports = withLess({
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
      };
    }
    return config;
  },
  transpilePackages: ['form-render', '@xrenders/schema-builder'],
});