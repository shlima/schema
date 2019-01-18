module.exports = {
  entry: './src/Schema.js',
  mode: 'production',

  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      }
    ]
  },

  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
    libraryTarget: 'umd',
    library: 'lib',
    umdNamedDefine: true,
    /**
     * @refs https://github.com/webpack/webpack/issues/6784#issuecomment-375941431
     */
    globalObject: 'typeof self !== \'undefined\' ? self : this',
  },
};
