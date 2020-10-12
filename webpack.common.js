const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const path = require('path');
const { GenerateSW } = require('workbox-webpack-plugin');

const CACHE_PREFIX = 'BFT';

module.exports = {
  entry: path.resolve(__dirname, 'src/scripts/index.js'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'assets/js/bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              url: false,
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 70000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  plugins: [
    new BundleAnalyzerPlugin(),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
        },
      ],
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, 'src/templates/index.html'),
      filename: 'index.html',
    }),
    new MiniCssExtractPlugin({
      filename: 'assets/css/stylesheet.css',
      ignoreOrder: true,
    }),
    new OptimizeCSSAssetsPlugin(),
    new GenerateSW({
      swDest: 'sw.js',
      clientsClaim: true,
      skipWaiting: true,
      ignoreURLParametersMatching: [/.*/],
      runtimeCaching: [{
        urlPattern: ({ url }) => url.href.indexOf('fonts.') > -1,
        handler: 'CacheFirst',
        options: {
          cacheName: `${CACHE_PREFIX}-Assets`,
          cacheableResponse: {
            statuses: [0, 200],
          },
          expiration: {
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Hari
          },
        },
      },
      {
        urlPattern: ({ url }) => url.href.indexOf('/images/') > -1,
        handler: 'CacheFirst',
        options: {
          cacheName: `${CACHE_PREFIX}-Images`,
          cacheableResponse: {
            statuses: [0, 200],
          },
          expiration: {
            maxAgeSeconds: 30 * 24 * 60 * 60, // 30 Hari
          },
        },
      },
      {
        urlPattern: ({ url }) => url.href.indexOf('/review') > -1,
        handler: 'NetworkOnly',
      },
      {
        urlPattern: ({ url }) => url.href.indexOf('dicoding') > -1,
        handler: 'StaleWhileRevalidate',
        options: {
          cacheName: `${CACHE_PREFIX}-Resources`,
        },
      }],
    }),
  ],
};
