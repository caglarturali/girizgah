const path = require('path');
const webpack = require('webpack');

const uncompressedPostCSSConfig = [require('autoprefixer')()];
const compressedPostCSSConfig = [
  ...uncompressedPostCSSConfig,
  require('cssnano')({ preset: 'default' })
];

module.exports = env => {
  env.NODE_ENV = env.production ? 'production' : 'development';
  process.env.NODE_ENV = env.NODE_ENV;

  const isProduction = env.NODE_ENV === 'production';

  return {
    entry: './src/js/Main.jsx',
    mode: env.NODE_ENV,
    output: {
      path: path.join(__dirname, 'dist', 'js'),
      filename: 'Girizgah.js'
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: ['babel-loader', 'eslint-loader']
        },
        {
          test: /\.(scss|sass)$/,
          use: [
            {
              loader: 'style-loader'
            },
            {
              loader: 'css-loader',
              options: {
                url: false,
                sourceMap: !isProduction
              }
            },
            {
              loader: 'postcss-loader',
              options: {
                plugins: isProduction
                  ? compressedPostCSSConfig
                  : uncompressedPostCSSConfig
              }
            },
            {
              loader: 'sass-loader',
              options: {
                sourceMap: !isProduction
              }
            }
          ]
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader']
        },
        {
          test: /\.svg$/,
          use: [
            {
              loader: 'svg-inline-loader',
              options: {
                removeTags: true
              }
            }
          ]
        }
      ]
    },
    devtool: isProduction ? 'source-map' : 'eval-source-map',
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(env.NODE_ENV)
      })
    ],
    resolve: {
      extensions: ['.js', '.min.js', '.jsx'],
      mainFiles: ['index', 'Main'],
      modules: ['./dist/js', './node_modules', './src', './src/js']
    },
    devServer: {
      contentBase: path.join(__dirname, '/'),
      publicPath: path.join(__dirname, 'dist', 'js'),
      historyApiFallback: true
    }
  };
};
