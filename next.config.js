const path = require('path');
const merge = require('lodash.merge');

module.exports = {
  webpack: (config) => {
    config.resolve = merge({}, config.resolve, {
      alias: {
        Components: path.resolve(__dirname, 'components'),
        Libs: path.resolve(__dirname, 'libs'),
        Sagas: path.resolve(__dirname, 'sagas'),
      },
    });
    config.node = {
      fs: 'empty',
    };
    return config;
  },
};
